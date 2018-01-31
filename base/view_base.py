from django.views import View


class ViewBase(View):
    def set_limit_offset(self, request, query_set):
        offset = request.GET.get('offset', 0)
        target = slice(offset, request.GET.get('limit', 999999) + offset)
        return query_set[target]
