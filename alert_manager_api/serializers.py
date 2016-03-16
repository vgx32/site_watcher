from rest_framework import serializers
from alert_manager_api.models import Alert, SearchTerm, MatchResult
from django.contrib.auth.models import User
import pdb


class SearchTermSerializer(serializers.ModelSerializer):

  def to_internal_value(self, data):
    dicted = {'term' : data}
    return super(SearchTermSerializer, self).to_internal_value(dicted)

  def to_representation(self, instance):
    return instance.term

  class Meta:
    model = SearchTerm
    fields = ('term',)


class AlertSerializer(serializers.ModelSerializer):
  search_terms = SearchTermSerializer(many=True)
  owner = serializers.SlugRelatedField(read_only=True,
                                      slug_field='username')

  def create(self, validated_data):
    user = self.context['request'].user
    search_terms = validated_data.pop('search_terms')
    alert = Alert.objects.create(owner=user, **validated_data)
    for term in search_terms:
      SearchTerm.objects.create(alert=alert, **term)
    return alert

  def update(self, instance, validated_data):
    search_terms = validated_data.pop('search_terms')
    SearchTerm.objects.filter(alert=instance).delete()
    for term in search_terms:
      SearchTerm.objects.create(alert=instance, **term)
    for k in validated_data.keys():
      setattr(instance, k, validated_data[k])
    instance.save()
    return instance

  class Meta:
    model = Alert
    fields = (
      'id'
      , 'owner'
      , 'root_url'
      , 'scrape_level'
      , 'search_terms'
      , 'analysis_op'
      , 'notification_type'
      , 'last_ran'
      )
    depth = 1




class MatchResultSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MatchResult
        fields = ('id', 'owner' ,'url', 'result_context')