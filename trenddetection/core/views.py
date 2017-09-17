import requests
from django.contrib.auth.models import User, Group
from pytrends.request import TrendReq
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from trenddetection.core.models import Tag, UserProfile, TagProfile
from trenddetection.core.serializers import UserSerializer, GroupSerializer, TagSerializer, UserProfileSerializer, \
    TagProfileSerializer


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


class TagProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows `TagProfiles`s to be viewed or edited.
    """
    queryset = TagProfile.objects.all()
    serializer_class = TagProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    `API endpoint that allows `UserProfile`s to be viewed or edited.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class SearchNewsViewSet(viewsets.ViewSet):

    http_method_names = ['get', 'options']
    GET_TOKEN_URL = 'https://commerce.reuters.com/rmd/rest/xml/login?username=HackZurichAPI&password=8XtQb447'


    def _get_token(self):
        r = requests.get(self.GET_TOKEN_URL)
        import re
        return re.findall('\<authToken\>(.*?)\<\/authToken\>', r.text)[0]

    def _get_domain(self):
        from django.contrib.sites.models import Site
        current_site = Site.objects.get_current()
        return current_site.domain

    def _get_news(self, topic, token):
        fulltext = ''
        for t in topic.split(' '):
            fulltext = '{} {} AND'.format(fulltext, t)

        import re
        fulltext = re.sub(' AND$', '', fulltext)

        r = requests.get(
            'http://rmb.reuters.com/rmd/rest/json/search'
            '?q=fulltext:{}&fragmentLength=4&maxAge=30D&token={}'.format(
                fulltext,
                token)
        )
        if r.status_code == 200:
            return r.json()['results']
        else:
            return {}

    def _get_item(self, id, token):
        r = requests.get(
            'http://rmb.reuters.com/rmd/rest/json/item?id={}&token={}'.format(
                id,
                token
            )
        )
        if r.status_code == 200:
            return r.json()
        else:
            return None




    def list(self, request):
        topics = request.GET.getlist('topics', [])
        # location = request.GET.get('location')
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        token = self._get_token()

        news, response = {}, {}

        for topic in topics:
            tag, _ = Tag.objects.get_or_create(name=topic)
            tag_profiles = TagProfile.objects.filter(tag__name=tag.name)
            if not tag_profiles:
                tag_profile = TagProfile.objects.create(tag=tag)
                profile.preferences.add(tag_profile)
                print('{} {}'.format(tag_profile.tag.name, tag_profile.value))
            else:
                for tag_profile in tag_profiles:
                    if tag_profile in profile.preferences.all():
                        tag_profile.value = tag_profile.value + 1
                        print('{} {}'.format(tag_profile.tag.name, tag_profile.value))
                    else:
                        tag_profile = TagProfile.objects.create(tag=tag)
                        profile.preferences.add(tag_profile)
                        print('{} {}'.format(tag_profile.tag.name, tag_profile.value))
            # TODO: call Google API

            # Call Reuters
            news.update(self._get_news(topic, token))


        # Call trends
        pytrend = TrendReq()
        trending_searches_df = pytrend.trending_searches()
        if list(trending_searches_df.title.values):
            for trend in trending_searches_df.title.values[:3]:
                # Call Reuters
                news.update(self._get_news(trend, token))


        count = 0
        for item in news['result']:
            response['item_{}'.format(count)] = self._get_item(item['id'], token)
            count = count + 1
            if count == 11:
                break

        return Response(response)
