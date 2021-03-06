import hashlib

from django.views import View


class ViewBase(View):
    def set_limit_offset(self, request, query_set):
        offset = int(request.GET.get('offset', 0))
        target = slice(offset, int(request.GET.get('limit', 999999)) + offset)
        return query_set[target]

    def hash_passwd(self, raw):
        return hashlib.sha256(bytearray(raw, "utf-8")).hexdigest()
