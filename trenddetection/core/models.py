from django.contrib.auth.models import User
from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    value = models.PositiveIntegerField(default=0)


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    tags = models.ManyToManyField(Tag, blank=True)
