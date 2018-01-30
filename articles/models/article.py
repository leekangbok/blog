from django.db import models

from .base import ArticleBase


class Article(ArticleBase):
    title = models.CharField(max_length=512)
    tag = models.CharField(max_length=512, null=True, blank=True, default='')
    num_stars = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.title
