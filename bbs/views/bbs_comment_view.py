import json

from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from base.view_base import ViewBase
from ..forms import BbsCommentForm
from ..models import Bbs, BbsComment


class BbsCommentView(ViewBase):
    def get(self, _, fk, pk=-1):
        if pk == -1:
            article = get_object_or_404(Bbs, pk=fk)
            return JsonResponse({
                'total': article.bbscomment_set.count(),
                'items': json.loads(serializers.serialize('json', article.bbscomment_set.all()))
            }, safe=False)
        return JsonResponse({
            'items': json.loads(
                serializers.serialize('json', [get_object_or_404(BbsComment, pk=pk)]))
        }, safe=False)

    def post(self, request, fk, pk=-1):
        article = get_object_or_404(Bbs, pk=fk)
        if pk > 0:
            instance = get_object_or_404(BbsComment, pk=pk)
            if instance.passwd != self.hash_passwd(request.POST.get('passwd', '')):
                return JsonResponse({'items': [], 'result': 'failure'}, safe=False)
        else:
            instance = None

        form = BbsCommentForm(request.POST or None, instance=instance)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.article = article
            comment.passwd = self.hash_passwd(comment.passwd)
            comment.save()
        return JsonResponse({
            'items': json.loads(serializers.serialize('json', [comment]))
        }, safe=False)

    def delete(self, request, fk, pk):
        instance = get_object_or_404(BbsComment, pk=pk)

        if self.hash_passwd(request.GET.get('passwd', '')) != instance.passwd:
            return JsonResponse({'result': 'failure'})

        instance.delete()
        return JsonResponse({'result': 'success'})
