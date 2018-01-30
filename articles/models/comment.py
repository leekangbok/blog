from django.db import models

from .article import Article
from .base import ArticleBase


class Comment(ArticleBase):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
