from rest_framework import serializers
from alert_manager_api.models import Alert, SearchTerm, MatchResult
from django.contrib.auth.models import User

class AlertSerializer(serializers.ModelSerializer):
  # owner = serializers.ReadOnlyField(source='owner.username')
  match_results = serializers.PrimaryKeyRelatedField(many=True)
  class Meta:
    model = Alert
    fields = ('id'
              , 'root_url'
              , 'scrape_level'
              , 'search_terms'
              , 'analysis_op'
              , 'notification_type'
              , 'last_ran'
              , 'match_results')
    



class MatchResultSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MatchResult
        fields = ('id', 'url', 'result_context')