from django.db import models

from .base import ArticleBase


class Article(ArticleBase):
    TAGS = (
        ('TEAM', '팀'),
        ('TRIP', '여행'),
        ('BBS', '게시판'),
        ('BITCOIN', '비트코인'),
        ('PYTHON', '파이썬'),
        ('PYTHON-FRAMEWORK', '파이썬 프레임워크'),
        ('JSCRIPT', '자바스크립트'),
        ('JSCRIPT-FRAMEWORK', '자바스크립트 프레임워크'),
        ('CPLUS+', 'C++'),
        ('CPLUS+-FRAMEWORK', 'C++ 프레임워크'),
        ('STOCK', '주식')
    )
    title = models.CharField(max_length=512)
    tag = models.CharField(max_length=64, choices=TAGS)
    num_stars = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.title
