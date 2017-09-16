from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from trenddetection.core.models import Tag, UserProfile
from trenddetection.core.serializers import UserSerializer, GroupSerializer, TagSerializer, UserProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = permissions.IsAdminUser


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = permissions.IsAdminUser


class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows `Tag`s to be viewed or edited.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    `API endpoint that allows `UserProfile`s to be viewed or edited.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class SearchNewsViewSet(viewsets.ViewSet):

    http_method_names = ['get', 'options']

    def list(self, request):
        topics = request.GET.getlist('topics', [])
        location = request.GET.get('location')
        # profile = UserProfile.objects.get(user=request.user)

        # tags_list = []
        # for topic in topics:
        #     tags_list.append(Tag(name=topic))

        # TODO: call Google API
        # TODO: Call Reuters
        # TODO: Call trends

        result = {}
        result['item_1'] = {
            'title': 'More protests break out in St. Louis',
            'link': 'http://www.reuters.com/article/us-missouri-crime/more-protests-break-out-in-st-louis-after-acquittal-in-police-shooting-idUSKCN1BQ161',
            'image_url': 'http://static.reuters.com/resources/media/global/assets/images/20170916/20170916_2287497220170916190541.jpg',
        }
        return Response(result)
