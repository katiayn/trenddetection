from django.contrib import admin

from trenddetection.core.models import UserProfile, Tag


class TagAdmin(admin.ModelAdmin):
    list_filter = ('name', )


class UserProfileAdmin(admin.ModelAdmin):
    list_filter = ('user', )


admin.site.register(Tag, TagAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
