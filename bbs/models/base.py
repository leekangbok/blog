from django.db import models


# Create your models here.

class BbsBase(models.Model):
    author = models.CharField(max_length=128, null=True, blank=True, default='')
    created_date = models.DateTimeField(auto_now_add=True)
    modify_date = models.DateTimeField(auto_now=True)
    passwd = models.CharField(max_length=512, null=True, blank=True, default='')
    body = models.TextField(max_length=8192)

    class Meta:
        abstract = True
        ordering = ['-created_date']
