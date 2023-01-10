from django.test import TestCase
from .models import Post
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
# Create your tests here.
User = get_user_model()

class PostTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="abc",password="somepass")

    def test_post_created(self):
        post = Post.objects.create(content="my post", user=self.user)
        self.assertEqual(post.id,1)
        self.assertEqual(post.user,self.user)
    def test_api_login(self):

        client = APIClient()
        client.login(username=self.user.username, password='somepass')
