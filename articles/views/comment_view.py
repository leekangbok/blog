from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views import View

from ..forms import CommentForm
from ..models import Article, Comment


class CommentView(View):
    def get(self, _, fk, pk=-1):
        if pk == -1:
            return HttpResponse(serializers.serialize('json', get_object_or_404(Article, pk=fk).comment_set.all()),
                                content_type='application/json')
        return HttpResponse(serializers.serialize('json', [get_object_or_404(Comment, pk=pk)]).strip('[]'),
                            content_type='application/json')

    def post(self, request, fk, pk=-1):
        article = get_object_or_404(Article, pk=fk)
        form = CommentForm(request.POST or None, instance=get_object_or_404(Comment, pk=pk) if pk > 0 else None)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.article = article
            comment.save()
        return HttpResponse()

    def delete(self, _, fk, pk):
        get_object_or_404(Comment, pk=pk).delete()
        return HttpResponse()
