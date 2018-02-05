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
        if pk > 0:
            instance = get_object_or_404(Comment, pk=pk)
            if instance.passwd != request.POST.get('passwd', ''):
                return JsonResponse({'items': [], 'result': 'failure'}, safe=False)
        else:
            instance = None

        form = CommentForm(request.POST or None, instance=instance)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.article = article
            comment.save()
        return JsonResponse({
            'items': json.loads(serializers.serialize('json', [comment]))
        }, safe=False)

    def delete(self, request, fk, pk, passwd):
        instance = get_object_or_404(Comment, pk=pk)

        if passwd != instance.passwd:
            return JsonResponse({'result': 'failure'})

        instance.delete()
        return JsonResponse({'result': 'success'})
