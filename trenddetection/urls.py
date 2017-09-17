from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers

from trenddetection.core import views

router = routers.DefaultRouter()
router.register(r'tags', views.TagViewSet)
router.register(r'tag-profiles', views.TagProfileViewSet)
router.register(r'user-profiles', views.UserProfileViewSet)
router.register(r'search', views.SearchNewsViewSet, base_name='search')

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
