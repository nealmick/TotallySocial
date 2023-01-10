from django.db import models
from django.conf import settings
from django.db.models import Q
from PIL import Image
User = settings.AUTH_USER_MODEL


class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)#
    post = models.ForeignKey('Post', on_delete=models.CASCADE)#
    timestamp = models.DateTimeField(auto_now_add=True)

class PostQuerySet(models.QuerySet):
    def by_username(self, username):
        return self.filter(user__username__iexact=username)
    def feed(self,user):
        profiles_exist = user.following.exists()
        followed_users_id = []
        if profiles_exist:
            followed_users_id = user.following.values_list("user__id")#[x.user.id for x in profiles]

        return self.filter(Q(user__id__in=followed_users_id)|Q(user=user)).distinct().order_by("-timestamp")

    def search(self,input):
        

        return self.filter(content__icontains=input).distinct().order_by("-timestamp")


class PostManager(models.Manager):
    def get_queryset(self,*args,**kwargs):
        return PostQuerySet(self.model,using=self.db)

    def feed(self,user):
        return self.get_queryset().feed(user)

    def search(self,input):
        return self.get_queryset().search(input)



class Conversation(models.Model):
    user1 = models.ForeignKey(User, related_name="user1",on_delete=models.CASCADE)#
    user2 = models.ForeignKey(User, related_name="user2",on_delete=models.CASCADE)#
    timestamp = models.DateTimeField(auto_now_add=True)
    last = models.DateTimeField(blank=True,null=True)
    class Meta:
        ordering = ["-id"]

    def serialize(self):
            return {
            "id":self.id,
            "user1":self.user1,
            "user2":self.user2,
            "timestamp":self.timestamp,
        }

class Message(models.Model):
    conversation = models.ForeignKey(Conversation,models.CASCADE)#
    content = models.TextField(blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name="user",on_delete=models.CASCADE)#
    class Meta:
        ordering = ["-id"]

    def serialize(self):
            return {
            "id":self.id,
            "content":self.content,
        }


class Post(models.Model):
    parent = models.ForeignKey("self",null=True,blank=True,on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE)#
    content = models.TextField(blank=True,null=True)
    image = models.FileField(blank=True,null=True,upload_to="images/")
    likes = models.ManyToManyField(User, related_name="post_user",blank=True,through=PostLike)
    timestamp = models.DateTimeField(auto_now_add=True)
    objects = PostManager()
    def __str__(self):
        return str(self.id)
    class Meta:
        ordering = ["-id"]
    @property
    def is_repost(self):
        return self.parent != None
    def serialize(self):
        return {
            "id":self.id,
            "content":self.content,
            "image":self.image,
            "likes":0,
        }





class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)#
    user = models.ForeignKey(User, null=True,blank=True,on_delete=models.CASCADE)#
    username = models.TextField(blank=True,null=True)
    content = models.TextField(blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-id"]
    def serialize(self):
            return {
            "id":self.id,
            "content":self.content,
        }