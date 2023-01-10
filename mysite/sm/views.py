from django.conf import settings
from django.shortcuts import render,redirect
from django.http import HttpResponse,Http404,JsonResponse

from profiles.models import Profile




def message_view(request,*args,**kwargs):
    profile_obj = None
    if request.user.is_authenticated:
        user = request.user
        qs = Profile.objects.filter(user=user)
        profile_obj = qs.first()
    
    context = {
        "user":request.user,
        "profile":profile_obj,
    }
    return render(request,"sm/message.html",context)



def conversations_view(request,*args,**kwargs):
    profile_obj = None
    if request.user.is_authenticated:
        user = request.user
        qs = Profile.objects.filter(user=user)
        profile_obj = qs.first()
    
    context = {
        "user":request.user,
        "profile":profile_obj,
    }
    return render(request,"sm/conversations.html",context)



def home_view(request,*args,**kwargs):
    profile_obj = None
    if request.user.is_authenticated:
        user = request.user
        qs = Profile.objects.filter(user=user)
        profile_obj = qs.first()
    print(profile_obj)
    
    context = {
        "user":request.user,
        "profile":profile_obj,
    }
    return render(request,"sm/feed.html",context)


def list_view(request,*args,**kwargs):
    userName = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request,"sm/posts/list.html")


def explore_view(request,*args,**kwargs):
    userName = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request,"sm/posts/explore.html")
    
def detail_view(request, post_id,*args,**kwargs):
    userName = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request,"sm/posts/detail.html",context={"post_id":post_id})


def search_view(request, search,*args,**kwargs):
    userName = None
    if request.user.is_authenticated:
        username = request.user.username
        user = request.user
        qs = Profile.objects.filter(user=user)
        profile_obj = qs.first()
        
        context = {
            "user":request.user,
            "profile":profile_obj,
        }
        return render(request,"sm/posts/search.html",context)

