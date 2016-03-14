from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token


# add token to user

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance= None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)


class Alert(models.Model):
  owner = models.ForeignKey('auth.User', 
              related_name='alerts', 
              on_delete=models.CASCADE)
  root_url = models.URLField() # required
  scrape_level = models.IntegerField(default = 1)
  # frequency = models.DurationField() #TODO: add in future, currently default to daily
  analysis_op = models.CharField(max_length=100)
  notification_type = models.CharField(max_length=100)
  last_ran = models.DateTimeField()
  # owner = models.ForeignKey('auth.User', related_name='alerts')

class SearchTerm(models.Model):
  models.CharField(max_length=100)
  models.ForeignKey('Alert', 
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