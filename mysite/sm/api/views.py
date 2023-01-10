from django.conf import settings
from django.shortcuts import render,redirect
from django.http import HttpResponse,Http404,JsonResponse
from .. models import Post,PostComment,Conversation,Message
from ..forms import PostForm
from ..serializers import PostSerializer,PostActionSerializer,PostCreateSerializer,CommentSerializer,ConversationSerializer,MessageSerializer,MessageCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from PIL import Image
from django.utils.datastructures import MultiValueDictKeyError
# Create your views here.
ALLOWED_HOSTS = settings.ALLOWED_HOSTS




@api_view(['GET'])
def get_conversation_view(request, username ,*args,**kwargs):
    print()
    print(request.user.username)
    id = ''
    if str(request.user.username) == str(username):
        return Response(status=404)
    qs = User.objects.filter(username=username)
    otheruser = qs.first()
    currentuser = request.user


    qs1 = Conversation.objects.filter(user1=otheruser,user2=currentuser)
    qs2 = Conversation.objects.filter(user1=currentuser,user2=otheruser)
    qs = qs1 | qs2
    qs = qs.first()
    if qs:
        print(qs.id)
        id = qs.id
    else:
        newnewConversation=Conversation.objects.create(user1=currentuser,user2=otheruser)
        newnewConversation.save()

        id = newnewConversation.id
    return Response(id,status=200)







@api_view(['GET'])
def conversation_view(request, conversation_id,*args,**kwargs):
    cqs = Conversation.objects.filter(id=conversation_id)
    qs = Message.objects.filter(conversation=conversation_id)
    print(qs)
    username = request.GET.get('username')
    uid = request.user.username
    if str(cqs.first().user1) == uid or str(cqs.first().user2) == uid:
        serializer = MessageSerializer(qs, many=True,context={"request":request}) 
        serializer2 = ConversationSerializer(cqs, many=True,context={"request":request}) 
        r = {"messages":serializer.data,"conversation":serializer2.data}
        return Response(r,status=200)

    return Response(status=403)







@api_view(['GET'])
def conversation_list_view(request, *args,**kwargs):
    uid = request.user.id
    qs = Conversation.objects.filter(user1=uid)
    qs2 = Conversation.objects.filter(user2=uid)
    qs = qs|qs2
    serializer = ConversationSerializer(qs, many=True,context={"request":request}) 

    return Response(serializer.data,status=200)



@api_view(['POST'])
#@authtication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def post_comment_view(request,post_id,*args,**kwargs):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        post = Post.objects.get(id=post_id)
        serializer.save(user=request.user,post=post,username=request.user.username)
        return Response(serializer.data,status=201)
    return Response({},status=400)


@api_view(['POST'])
#@authtication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def message_create_view(request,*args,**kwargs):
    
    serializer = MessageCreateSerializer(data=request.data)
    print(request.data)

    if serializer.is_valid(raise_exception=True):

        serializer.save(user=request.user)
        return Response(serializer.data,status=201)
    return Response({},status=400)

@api_view(['POST'])
#@authtication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def post_create_view(request,*args,**kwargs):
    
    serializer = PostCreateSerializer(data=request.data)
    print(request.data)

    if serializer.is_valid(raise_exception=True):
        try:
            print(request.FILES['image'])
            serializer.save(user=request.user,image=request.FILES['image'])

        except MultiValueDictKeyError:
            
            serializer.save(user=request.user)

        return Response(serializer.data,status=201)
    return Response({},status=400)
@api_view(['GET'])
def post_list_view(request, *args,**kwargs):
    qs = Post.objects.all()
    username = request.GET.get('username')
    if username != None:
        qs = qs.by_username(username)

    return get_paginated_queryset_response(qs,request)



def get_paginated_queryset_response(qs,request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    paginated_qs = paginator.paginate_queryset(qs,request)
    serializer = PostSerializer(paginated_qs, many=True,context={"request":request}) 

    return paginator.get_paginated_response(serializer.data)


def get_paginated_queryset_comments_response(qs,request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    paginated_qs = paginator.paginate_queryset(qs,request)
    serializer = CommentSerializer(paginated_qs, many=True,context={"request":request}) 

    return paginator.get_paginated_response(serializer.data)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def post_feed_view(request, *args,**kwargs):
    user = request.user
    qs = Post.objects.feed(user)

    return get_paginated_queryset_response(qs,request)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def post_search_view(request, input,*args,**kwargs):
    
    qs = Post.objects.search(input)

    return get_paginated_queryset_response(qs,request)




@api_view(['GET'])
def post_detail_view(request,post_id, *args,**kwars):
    qs = Post.objects.filter(id=post_id)
    if not qs.exists():
        return Response({},status=404)
    obj=qs.first()

    print(obj.id)
    commentqs = PostComment.objects.filter(post=obj.id)
    #comments = get_paginated_queryset_comments_response(commentqs,request)
    #x = (comments.content)
    #return comments
    seriaizer = PostSerializer(obj) 
    commentSeriaizer = CommentSerializer(obj) 

    return Response(seriaizer.data)
@api_view(['DELETE','POST'])
@permission_classes([IsAuthenticated])
def post_delete_view(request,post_id, *args,**kwars):
    qs = Post.objects.filter(id=post_id)
    if not qs.exists():
        return Response({},status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message":"You cannot delete this post."},status=401)
    obj=qs.first()
    obj.delete()

    return Response({"message":"Post Deleted."},status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_action_view(request, *args,**kwars):
    #like unlike and repost
    #id is required
    serializer = PostActionSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        qs = Post.objects.filter(id=post_id)
        if not qs.exists():
            return Response({},status=404)
        obj=qs.first()
        if action == "like":
            obj.likes.add(request.user)
            seriaizer = PostSerializer(obj) 
            return Response(seriaizer.data,200)
        elif action == "unlike":   
            obj.likes.remove(request.user)
            seriaizer = PostSerializer(obj) 
            return Response(seriaizer.data,200)
        elif action == "repost":
            new_post = Post.objects.create(user=request.user,parent=obj,content=content)
            seriaizer = PostSerializer(new_post) 
            #return redirect("/https://www.djangoproject.com")
            return Response(seriaizer.data,200)


    return Response({},status=200)









def post_create_view_django(request,*args,**kwargs):
    '''
    rest api
    '''
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if is_ajax(request):
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    form = PostForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if is_ajax(request):
            return JsonResponse(obj.serialize(),status=201)#created
        if next_url !=None:
            return redirect(next_url)
        form = PostForm()
    if form.errors:
        if is_ajax(request):
            return JsonResponse(form.errors, status=400)
    return render(request,"sm/components/form.html", context={"form":form})

def post_detail_view_django(request,post_id,*args,**kwargs):

    status = 200
    data ={
        "id" : post_id,
        #"content" : obj.content,
        #"image_path" : obj.image.url,
    }
    try:
        obj = Post.objects.get(id=post_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not Found"
        status = 404

    return JsonResponse(data,status=status)
def post_list_view_django(request, *args,**kwars):
    qs = Post.objects.all()
    posts_list = [x.serialize() for x in qs]
    data = {
        "isUser": False,
        'response':posts_list,
    }
    return JsonResponse(data)
def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'