from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404

from base.view_base import ViewBase
from ..forms import ArticleForm
from ..models import Article


class ArticleView(ViewBase):
    def get(self, request, pk=-1):
        if pk == -1:
            try:
                return HttpResponse(serializers.serialize('json', self.get_query_set(request)),
                                    content_type='application/json')
            except Http404:
                return JsonResponse([], safe=False)

        return HttpResponse(
            serializers.serialize('json', [get_object_or_404(Article, pk=pk)]).strip('[]'),
            content_type='application/json')

    def post(self, request, pk=-1):
        form = ArticleForm(request.POST or None,
                           instance=get_object_or_404(Article, pk=pk) if pk > 0 else None)
        if form.is_valid():
            article = form.save(commit=False)
            article.save()
        return HttpResponse()

    def delete(self, _, pk=-1):
        get_object_or_404(Article, pk=pk).delete()
        return HttpResponse()

    def get_query_set(self, request):
        query_set = self.set_limit_offset(request, Article.objects.all())
        return query_set
