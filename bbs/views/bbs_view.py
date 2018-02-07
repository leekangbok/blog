import json

from django.core import serializers
from django.http import JsonResponse
from django.http.response import Http404
from django.shortcuts import get_object_or_404

from base.view_base import ViewBase
from ..forms import BbsForm
from ..models import Bbs


class BbsView(ViewBase):
    def get(self, request, pk=-1):
        if pk == -1:
            try:
                qs = self.get_query_set(request)
                return JsonResponse({
                    'total'     : Bbs.objects.count(),
                    'curr_total': qs.count(),
                    'items'     : json.loads(
                        serializers.serialize('json', self.set_limit_offset(request, qs)))
                }, safe=False)
            except Http404:
                return JsonResponse({
                    'total'     : Bbs.objects.count(),
                    'curr_total': 0,
                    'items'     : []
                }, safe=False)

        return JsonResponse({
            'items': json.loads(serializers.serialize('json', [get_object_or_404(Bbs, pk=pk)]))
        }, safe=False)

    def post(self, request, pk=-1):
        if pk > 0:
            instance = get_object_or_404(Bbs, pk=pk)
            if instance.passwd != self.hash_passwd(request.POST.get('passwd', '')):
                return JsonResponse({'items': [], 'result': 'failure'}, safe=False)
        else:
            instance = None

        form = BbsForm(request.POST or None, instance=instance)
        if form.is_valid():
            bbs = form.save(commit=False)
            bbs.passwd = self.hash_passwd(bbs.passwd)
            bbs.save()
        return JsonResponse({
            'items': json.loads(serializers.serialize('json', [bbs]))
        }, safe=False)

    def delete(self, request, pk):
        instance = get_object_or_404(Bbs, pk=pk)

        if self.hash_passwd(request.GET.get('passwd', '')) != instance.passwd:
            return JsonResponse({'result': 'failure'})

        instance.delete()
        return JsonResponse({'result': 'success'})

    @staticmethod
    def get_query_set(request):
        query = request.GET.get('query', '')
        if query:
            qs = Bbs.objects
            if query:
                qs = qs.filter(body__icontains=query)
        else:
            qs = Bbs.objects.all()
        return qs
