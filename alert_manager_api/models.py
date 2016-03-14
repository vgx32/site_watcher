from django.db import models

# Create your models here.

class Alert(models.Model):

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
  models.ForeignKey('Alert',
                      on_delete=models.CASCADE,
                      related_name='match_results')
  url = models.URLField()
  result_context = models.TextField()