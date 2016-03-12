from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.root, name='api_root'),
    # url(r'^alerts/$', views.root, name='alerts'),
    # url(r'^alerts/(?P<alert_id>[0-9]+)/$', views.root, name='alert'),
    # url(r'^matches/$', views.root, name='matches'),
    # url(r'^matches/(?P<notification_id>[0-9]+)/$', views.root, name='match'),
    


]

