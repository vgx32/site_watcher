from django.db import models

# Create your models here.

class Alert(models.Model):

  root_url = models.URLField()
  scrape_level = models.IntegerField()
  frequency = models.DurationField()
  analysis_op = models.CharField(max_length=100)
  notification_type = models.CharField(max_length=100)
  last_ran = models.DateTimeField()


class SearchTerm(models.Model):
  models.CharField(max_length=100)
  models.ForeignKey('Alert', 
                    on_delete=models.CASCADE,
                    related_name='search_terms')

class MatchResult(models.Model):
  models.ForeignKey('Alert',
                      on_delete=models.CASCADE,
                      related_name='results')
  url = models.URLField()
  result_context = models.TextField()