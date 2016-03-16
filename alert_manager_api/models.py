from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.utils import timezone
from rest_framework.authtoken.models import Token
import datetime


# add token to user

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance= None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)
# look at this in the future
# http://stackoverflow.com/questions/27570377/change-token-for-tokenauthentication-each-time-user-logs-in

class Alert(models.Model):
  owner = models.ForeignKey('auth.User', 
              related_name='alerts', 
              on_delete=models.CASCADE)
  root_url = models.URLField() # required
  scrape_level = models.IntegerField(default = 1)
  # frequency = models.DurationField() #TODO: add in future, currently default to daily
  analysis_op = models.CharField(max_length=100, default='match')
  notification_type = models.CharField(max_length=100, default='none')
  last_ran = models.DateTimeField(default=timezone.now())

class SearchTerm(models.Model):
  term = models.CharField(max_length=100)
  alert = models.ForeignKey('Alert', 
                    on_delete=models.CASCADE,
                    related_name='search_terms')

class MatchResult(models.Model):
  alert = models.ForeignKey('Alert',
                      on_delete=models.CASCADE,
                      related_name='match_results')

  owner = models.ForeignKey('auth.User',
                      on_delete=models.CASCADE,
                      related_name='match_results')
  
  url = models.URLField()
  result_context = models.TextField()