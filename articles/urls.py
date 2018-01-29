from django.urls import path

from .views import ArticlesView, ArticleView

urlpatterns = [
    path('', ArticlesView.as_view()),
    path('<str:article_id>/', ArticleView.as_view())
]
