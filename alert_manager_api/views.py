from django.shortcuts import render

def root(request):
  return render(request, 'alert_manager/index.html')