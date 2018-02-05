from django.urls import path, include

from .views import ArticleView, CommentView

app_name = 'articles'
urlpatterns = [
    path('article/', include([
        path('', ArticleView.as_view()),
        path('add/', ArticleView.as_view()),
        path('<int:pk>/', include([
            path('', ArticleView.as_view()),
            path('change/', ArticleView.as_view()),
            path('delete/', ArticleView.as_view())
        ]))
    ])),
    path('comment/<int:fk>/', include([
        path('', CommentView.as_view()),
        path('add/', CommentView.as_view()),
        path('<int:pk>/', include([
            path('', CommentView.as_view()),
            path('change/', CommentView.as_view()),
            path('delete/<str:passwd>/', CommentView.as_view())
        ]))
    ]))
]

# articles/article/ -- get
# articles/article/1/ -- get
# articles/article/add/ -- post
# articles/article/1/change/ -- get, post
# articles/article/1/delete/ -- delete

# articles/comment/1/ -- get
# articles/comment/1/2/ -- get
# articles/comment/1/add/ -- post
# articles/comment/1/2/change/ -- get, post
# articles/comment/1/2/delete/ -- delete
