
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import viewsets

from django.contrib.auth.models import User

from alert_manager_api.models import Alert, MatchResult
from alert_manager_api.serializers import AlertSerializer, MatchResultSerializer, UserSerializer
from alert_manager_api.permissions import IsAdminOrTargetUser


@api_view()
def root(request):
  return Response({"result" : "ok"})

class UserViewSet(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  model = User
  
  def get_permissions(self):
    return (AllowAny() if self.request.method == 'POST'
            else IsAdminOrTargetUser()),
# add this to viewset
class AlertViewSet(viewsets.ModelViewSet):
  serializer_class = AlertSerializer
  
  def get_queryset(self):
    return Alert.objects.filter(owner=self.request.user)

class MatchResultViewSet(viewsets.ModelViewSet):
  serializer_class = MatchResultSerializer
  
  def get_queryset(self):
    if 'alert' in self.request.query_params:
      alert_id = self.request.query_params['alert']
      return MatchResult.objects.filter(owner=self.request.user).filter(alert=alert_id)

    else:
      return MatchResult.objects.filter(owner=self.request.user)
