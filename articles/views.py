from django.core import serializers
from django.http import JsonResponse
from django.views import View

from .models import Article


# Create your views here.

class ArticlesView(View):
    def get(self, request):
        articles = serializers.serialize('json', Article.objects.all())
        return JsonResponse(articles, safe=False)


class ArticleView(View):
    def get(self, request, article_id):
        return JsonResponse({'path': 'ArticleView'})

    def delete(self, request, article_id):
        return JsonResponse({'path': 'ArticleView'})
