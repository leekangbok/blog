from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404, get_list_or_404
from django.views import View

from ..forms import ArticleForm
from ..models import Article


class ArticleView(View):
    def get(self, _, pk=-1):
        if pk == -1:
            try:
                return HttpResponse(serializers.serialize('json', get_list_or_404(Article)),
                                    content_type='application/json')
            except Http404:
                return JsonResponse([], safe=False)

        return HttpResponse(serializers.serialize('json', [get_object_or_404(Article, pk=pk)]).strip('[]'),
                            content_type='application/json')

    def post(self, request, pk=-1):
        form = ArticleForm(request.POST or None, instance=get_object_or_404(Article, pk=pk) if pk > 0 else None)
        if form.is_valid():
            article = form.save(commit=False)
            article.save()
        return HttpResponse()

    def delete(self, _, pk=-1):
        get_object_or_404(Article, pk=pk).delete()
        return HttpResponse()
