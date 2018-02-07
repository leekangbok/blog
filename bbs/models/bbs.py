from django.db import models

from .base import BbsBase


class Bbs(BbsBase):
    title = models.CharField(max_length=512)

    def __str__(self):
        return self.title
