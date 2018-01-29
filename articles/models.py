import uuid

from django.db import models


# Create your models here.

class Article(models.Model):
    body = models.TextField()
    author = models.CharField(max_length=128)
    article_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
