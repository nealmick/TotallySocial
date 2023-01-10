"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,re_path,include
from sm.views import home_view,detail_view,list_view,search_view,conversations_view,message_view,explore_view
from django.views.generic import TemplateView
from accounts.views import login_view,logout_view,register_view
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',home_view),
    path('conversations/',conversations_view),
    path('conversation/<int:conversation_id>/',message_view),
    path('explore/', explore_view),
    #path('login/', login_view),
    #path('logout/', logout_view),
    #path('register/', register_view),
    path('search/<str:search>', search_view),
    path('<int:post_id>', detail_view),
    re_path('profile/', include('profiles.urls')),

    path('api/posts/',include('sm.api.urls')),
    re_path('api/profile/', include('profiles.api.urls')),

]
if settings.DEBUG:
    urlpatterns+=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)