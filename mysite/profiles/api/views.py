from django.conf import settings
from django.shortcuts import render,redirect
from django.http import HttpResponse,Http404,JsonResponse
from .. models import Profile
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import get_user_model
from .. serializers import PublicProfileSerializer
User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS

'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_detail_view(request, username,*args,**kwargs):
    current_user = request.user
    to_follow_user = asdf
    return Response({},status=400)

'''

@api_view(['GET','POST'])
def profile_detail_api_view(request, username,*args,**kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Response({"detail":"User Not Found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    if request.method == "POST":
        action = data.get("action")
        current_user=request.user
        if profile_obj.user != current_user:
            if action =="follow":
                profile_obj.followers.add(current_user)
            elif action == "unfollow":
                profile_obj.followers.remove(current_user)
            else:
                pass
    serializer = PublicProfileSerializer(instance=profile_obj,context={"request":request})
    
    return Response(serializer.data,status=200)

'''

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username,*args,**kwargs):
    current_user = request.user
    other_user_qs = User.objects.filter(username=username)
    print('blah')
    if current_user.username == username:

        current_user_followers = current_user.profile.followers.all()
        return Response({"count":current_user_followers.count()},status=200)
    if not other_user_qs.exists():
        return Response({},status=404) 
    other = other_user_qs.first()
    profile = other.profile

    data = request.data or {}


    data = PublicProfileSerializer(instance=profile,context={"request":request})
    return Response(data.data,status=200)
'''