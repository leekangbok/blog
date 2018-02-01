import json

from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from base.view_base import ViewBase
from ..forms import CommentForm
from ..models import Article, Comment


class CommentView(ViewBase):
    def get(self, _, fk, pk=-1):
        if pk == -1:
            article = get_object_or_404(Article, pk=fk)
            return JsonResponse({
                'total': article.comment_set.count(),
                'items': json.loads(serializers.serialize('json', article.comment_set.all()))
            }, safe=False)
        return JsonResponse({
            'items': json.loads(serializers.serialize('json', [get_object_or_404(Comment, pk=pk)]))
        }, safe=False)

    def post(self, request, fk, pk=-1):
        article = get_object_or_404(Article, pk=fk)
        form = CommentForm(request.POST or None,
                           instance=get_object_or_404(Comment, pk=pk) if pk > 0 else None)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.article = article
            comment.save()
        return JsonResponse({'result': 'success'})

    def delete(self, _, fk, pk):
        get_object_or_404(Comment, pk=pk).delete()
        return JsonResponse({'result': 'success'})
