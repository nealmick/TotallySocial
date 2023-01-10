from django.contrib import admin
from .models import Post,PostLike,PostComment,Conversation,Message
# Register your models here.
class PostLikeAdmin(admin.TabularInline):
    model = PostLike
class PostCommentdmin(admin.TabularInline):
    model = PostComment
class PostAdmin(admin.ModelAdmin):
    inlines = [PostLikeAdmin,PostCommentdmin]
    list_display = ['__str__','user']
    search_fields = ['content','user__username','user__email']
    class Meta:
        model = Post

admin.site.register(Conversation)
admin.site.register(Message)

admin.site.register(Post,PostAdmin)
