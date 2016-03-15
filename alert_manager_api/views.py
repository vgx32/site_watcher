from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import list_route, api_view
from rest_framework.response import Response
from rest_framework import generics, mixins

from alert_manager_api.models import Alert, MatchResult
from alert_manager_api.serializers import AlertSerializer
from rest_framework.views import APIView

@api_view()
def root(request):
  return Response({"result" : "ok"})

class AlertListView(mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):

  queryset = Alert.objects.all()
  serializer_class = AlertSerializer

  def get(self, request, *args, **kwargs):
    return self.list(request, *args, **kwargs)

  def post(self, request, *args, **kwargs):
    return self.create(request, *args, **kwargs)
