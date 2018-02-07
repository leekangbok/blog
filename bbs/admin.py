from django.contrib import admin

from .models import Bbs, BbsComment

# Register your models here.
admin.site.register(Bbs)
admin.site.register(BbsComment)
