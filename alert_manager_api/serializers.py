from rest_framework import serializers
from alert_manager_api.models import Alert, SearchTerm, MatchResult
from django.contrib.auth.models import User

class AlertSerializer(serializers.ModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username')
  class Meta:
    model = Alert
    fields = ('owner'
              , 'root_url'
              , 'scrape_level'
              , 'search_terms'
              , 'analysis_op'
              , 'notification_type'
              , 'last_ran')

class SearchTermSerializer(serializers.ModelSerializer):
  class Meta:
    model = SearchTerm
    fields = ('term')

class MatchResultSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MatchResult
        fields = ('id', 'owner' ,'url', 'result_context')