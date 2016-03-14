from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import list_route, api_view
from rest_framework.response import Response

@api_view()
def root(request):
  return Response({"redsult" : "ok"})

# add this to viewset
# @list_route(medthods=['GET'])
# def root(request):
#   meta = self.metadata_class()
#   data = meta.determine_metadata(request, self)
#   return Response(data)