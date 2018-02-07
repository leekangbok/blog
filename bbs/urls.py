from django.urls import path, include

from .views import BbsView, BbsCommentView

app_name = 'bbs'
urlpatterns = [
    path('bbs/', include([
        path('', BbsView.as_view()),
        path('add/', BbsView.as_view()),
        path('<int:pk>/', include([
            path('', BbsView.as_view()),
            path('change/', BbsView.as_view()),
            path('delete/', BbsView.as_view())
        ]))
    ])),
    path('comment/<int:fk>/', include([
        path('', BbsCommentView.as_view()),
        path('add/', BbsCommentView.as_view()),
        path('<int:pk>/', include([
            path('', BbsCommentView.as_view()),
            path('change/', BbsCommentView.as_view()),
            path('delete/', BbsCommentView.as_view())
        ]))
    ]))
]

# bbses/bbs/ -- get
# bbses/bbs/1/ -- get
# bbses/bbs/add/ -- post
# bbses/bbs/1/change/ -- get, post
# bbses/bbs/1/delete/ -- delete

# bbses/comment/1/ -- get
# bbses/comment/1/2/ -- get
# bbses/comment/1/add/ -- post
# bbses/comment/1/2/change/ -- get, post
# bbses/comment/1/2/delete/ -- delete
