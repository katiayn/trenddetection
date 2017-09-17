from django.contrib.auth.models import User
from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)


class TagProfile(models.Model):
    tag = models.ForeignKey(Tag)
    value = models.PositiveIntegerField(default=0)


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    preferences = models.ManyToManyField(TagProfile, blank=True)

