from django.db import models

from .base import BbsBase
from .bbs import Bbs


class BbsComment(BbsBase):
    bbs = models.ForeignKey(Bbs, on_delete=models.CASCADE)
