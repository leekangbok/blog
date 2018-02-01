import json

from django.core import serializers
from django.http import JsonResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404

from base.view_base import ViewBase
from ..forms import ArticleForm
from ..models import Article


class ArticleView(ViewBase):
    def get(self, request, pk=-1):
        if pk == -1:
            try:
                qs = self.get_query_set(request)
                return JsonResponse({
                    'total'     : Article.objects.count(),
                    'curr_total': qs.count(),
                    'items'     : json.loads(serializers.serialize('json', self.set_limit_offset(request, qs)))
                }, safe=False)
            except Http404:
                return JsonResponse({
                    'total'     : Article.objects.count(),
                    'curr_total': 0,
                    'data'      : []
                }, safe=False)

        return JsonResponse({
            'items': json.loads(serializers.serialize('json', [get_object_or_404(Article, pk=pk)]))
        }, safe=False)

    def post(self, request, pk=-1):
        form = ArticleForm(request.POST or None,
                           instance=get_object_or_404(Article, pk=pk) if pk > 0 else None)
        if form.is_valid():
            article = form.save(commit=False)
            article.save()
        return JsonResponse({'result': 'success'})

    def delete(self, _, pk=-1):
        get_object_or_404(Article, pk=pk).delete()
        return JsonResponse({'result': 'success'})

    def get_query_set(self, request):
        query = request.GET.get('query', '')
        tag = request.GET.get('tag', '')
        if query or tag:
            qs = Article.objects
            if query:
                qs = qs.filter(body__icontains=query)
            if tag:
                qs = qs.filter(tag__iexact=tag)
        else:
            qs = Article.objects.all()
        return qs
