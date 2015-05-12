"""
Definition of models.
"""

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class House(models.Model):
    title = models.CharField(max_length = 50)
    housetype = models.PositiveSmallIntegerField()
    roomtype = models.PositiveSmallIntegerField()
    checkinNumber = models.PositiveSmallIntegerField()
    startime = models.DateField()
    endtime = models.DateField()
    createdTime = models.DateTimeField(auto_now_add = True)
    updatedTime = models.DateTimeField(auto_now_add = True)
    timesViewed = models.PositiveIntegerField()
    address = models.CharField(max_length = 100)
    description = models.CharField(max_length = 1000)
    rent = models.DecimalField(decimal_places = 2,max_digits = 20)
    rentype = models.PositiveSmallIntegerField()
    contactNumber = models.CharField(max_length = 20,null=True)
    publisher = models.ForeignKey(User)
    pics = models.ImageField(upload_to = 'temp_media/%Y/%m/%d',blank=True,null=True)


    def __unicode__(self):
        return self.title

class UserProfile(models.Model):
    user = models.ForeignKey(User);
    avatar = models.FileField()

class HousePicture(models.Model):
    pic = models.ImageField()