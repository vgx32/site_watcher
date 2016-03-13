from rest_framework import serializers
from alert_manager_api.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES
from django.contrib.auth.models import User

class AlertSerializer(serializers.ModelSerializer):
  # owner = serializers.ReadOnlyField(source='owner.username')
  match_results = serializers.PrimaryKeyRelatedField(many=True)
  class Meta:
    model = Snippet
    fields = ('id', 'root_url', 'scrape_level', 'search_terms', 'frequency', 'analysis_op', 'notification_type', 'last_ran', 'match_results') # 'owner'


class MatchResultSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'url', 'result_context')













    

# class SnippetSerializer(serializers.Serializer):
#   pk = serializers.IntegerField(read_only=True)
#   title = serializers.CharField(required=False, allow_blank=True, max_length=100)
#   code = serializers.CharField(style={'base_template': 'textarea.html'})
#   linenos = serializers.BooleanField(required=False)
#   language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
#   style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

#   def create(self, validated_data):
#     """Create and return a new Snippet instance, given validated data"""
#     return Snippet.objects.create(**validated_data)

#   def update(self, instance, validated_data):
#     """ update and return an existing Snippet instance, given validated data"""
#     instance.title = validated_data.get('title', instance.title)
#     instance.code = validated_data.get('code', instance.code)
#     instance.linenos = validated_data.get('linenos', instance.linenos)
#     instance.language = validated_data.get('language', instance.language)
#     instance.style = validated_data.get('style', instance.style)

#     instance.save()
#     return instance

