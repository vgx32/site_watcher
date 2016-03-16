
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from alert_manager_api.models import Alert, MatchResult
from alert_manager_api.serializers import AlertSerializer, MatchResultSerializer

@api_view()
def root(request):
  return Response({"result" : "ok"})

# add this to viewset
class AlertViewSet(viewsets.ModelViewSet):
  serializer_class = AlertSerializer
  
  def get_queryset(self):
    return Alert.objects.filter(owner=self.request.user)

class MatchResultViewSet(viewsets.ModelViewSet):
  serializer_class = MatchResultSerializer
  
  def get_queryset(self):
    return MatchResult.objects.filter(owner=self.request.user)
