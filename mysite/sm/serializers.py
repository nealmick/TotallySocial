from rest_framework import serializers
from django.conf import settings
from .models import Post,PostComment,Conversation,Message
from profiles.serializers import PublicProfileSerializer
import time


class PostCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    user = PublicProfileSerializer(source='user.profile',read_only=True)#serializers.SerializerMethodField(read_only=True)
    #image = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['user','image','id','content','likes','timestamp']

    def get_likes(self,obj):
        return obj.likes.count()
    def validate_content(self,value):
        if len(value) > settings.MAX_LENGTH:
            raise serializers.ValidationError("This Post is too long")
        return value


class MessageCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile',read_only=True)#serializers.SerializerMethodField(read_only=True)
    #image = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields = ['user','conversation','content','timestamp']

    def validate_content(self,value):
        if len(value) > settings.MAX_LENGTH:
            raise serializers.ValidationError("This Post is too long")
        return value





class MessageSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile',read_only=True)
    content = serializers.SerializerMethodField(read_only=True)
    timestamp = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Message
        fields = ['id','user','content','timestamp']


    def get_content(self,obj):
        return obj.content
    
    def get_timestamp(self,obj):
        return obj.timestamp.strftime("%Y-%m-%d %H:%M")



        
class ConversationSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField(read_only=True)

    otherUser = serializers.SerializerMethodField('_user')

    user1 = PublicProfileSerializer(source='user1.profile',read_only=True)
    user2 = PublicProfileSerializer(source='user2.profile',read_only=True)

    # Use this method for the custom field
    def _user(self, obj):
        request = self.context.get('request', None)
        if request:
            if request.user.id == obj.user1.id:
                return 'user2'

            if request.user.id == obj.user2.id:
                return 'user1'
    class Meta:
        model = Conversation
        fields = ['id','timestamp','user1','user2','otherUser']

    def get_timestamp(self,obj):
        return obj.timestamp.strftime("%Y-%m-%d %H:%M")


    

class CommentSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile',read_only=True)
    class Meta:
        model = PostComment
        fields = ['user','content','timestamp']


    def validate_content(self,value):
        if len(value) > settings.MAX_LENGTH:
            raise serializers.ValidationError("This Post is too long")
        return value

class PostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    user = PublicProfileSerializer(source='user.profile',read_only=True)
    commentCount=serializers.SerializerMethodField(read_only=True)
    comments=serializers.SerializerMethodField(read_only=True)
    imagepath=serializers.SerializerMethodField(read_only=True)
    
    parent = PostCreateSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['user','id','commentCount','comments','content','likes','is_repost','parent','timestamp','imagepath']

    def get_imagepath(self,obj):
        if obj.image:
            return obj.image.path.split('/')[-1]
        else:
            return None
    def get_likes(self,obj):
        return obj.likes.count()

    def get_content(self,obj):
        content = obj.content
        if obj.is_repost:
            content = obj.parent.content
        return content
    def get_commentCount(self,obj):
        commentqs = PostComment.objects.filter(post=obj.id)
        return commentqs.count()
    def get_comments(self,obj):
        commentqs = PostComment.objects.filter(post=obj.id)
        comments = []
        for c in commentqs:
            comments.append([c.content,c.username,c.timestamp.strftime("%Y-%m-%d %H:%M"),c.user.profile.image.path.split('/')[-1]])
            
            print(c.content)
        return comments


class PostActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)
    def validate_action(self, value):
        value = value.lower().strip()
        if not value in settings.POST_ACTION_OPTIONS:
            raise serializers.ValidationError("Not Valid Action.")
        return value
