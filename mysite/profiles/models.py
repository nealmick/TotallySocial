from django.db import models
from django.conf import settings
from PIL import Image
from django.db.models.signals import post_save
from django.contrib.auth.models import User
User._meta.get_field('email')._unique = True

User = settings.AUTH_USER_MODEL
class FollowerRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    location = models.CharField(max_length=20,null=True,blank=True)
    status = models.CharField(max_length=120,null=True,blank=True)
    bio = models.TextField(max_length=120,null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    followers = models.ManyToManyField(User, related_name='following',blank=True)
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300,300)
            img.thumbnail(output_size)

            img.save(self.image.path)
        return super().save(*args, **kwargs)
    def __str__(self):
        return f'{self.user.username}'
