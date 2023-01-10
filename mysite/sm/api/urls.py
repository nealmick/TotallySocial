
from django.urls import path,re_path
from .views import *
urlpatterns = [
    path('', post_list_view),
    path('conversations/', conversation_list_view),
    path('conversations/<str:username>', get_conversation_view),
    path('conversation/<int:conversation_id>', conversation_view),
    path('action/', post_action_view),
    path('create-post/', post_create_view),
    path('create-message/', message_create_view),
    path('feed/', post_feed_view),
    path('search/<str:input>/', post_search_view),
    path('<int:post_id>/', post_detail_view),
    path('<int:post_id>/comment/', post_comment_view),
    path('<int:post_id>/delete/', post_delete_view),
]
