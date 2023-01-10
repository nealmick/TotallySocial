from django.urls import path,re_path,include
#from .views import profile_detail_view,profile_update_view
from profiles import views as user_views
from django.contrib.auth import views as auth_views
urlpatterns = [
    #path('edit/',profile_update_view),
    path('<str:username>',user_views.profile_detail_view),
    path('register/', user_views.register, name='register'),
    path('edit/', user_views.profile, name='profile'),

    path('login/', auth_views.LoginView.as_view(template_name='profiles/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='profiles/logout.html'), name='logout'),

]
