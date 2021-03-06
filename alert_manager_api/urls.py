from django.conf.urls import url
# from alert_manager_api.views import AlertListView,  root
from alert_manager_api.views import AlertViewSet, MatchResultViewSet, UserViewSet, root
from rest_framework.authtoken import views



alert_list = AlertViewSet.as_view({
  'get' : 'list',
  'post': 'create'
  })

alert_detail = AlertViewSet.as_view({
  'get' : 'retrieve',
  'put' : 'update',
  'delete': 'destroy'
})

match_list = MatchResultViewSet.as_view({
  'get' : 'list',
  'post' : 'create'
})

match_detail = MatchResultViewSet.as_view({
  'get' : 'retrieve',
  'delete' : 'destroy'
})

user_detail = UserViewSet.as_view({
  'get' : 'retrieve',
  'post': 'create',
  'put' : 'update',
  })

urlpatterns = [
    url(r'^$', root, name='api_root'),
    url(r'^alerts/$', alert_list, name='alerts'),
    url(r'^alerts/(?P<pk>[0-9]+)/$', alert_detail, name='alert'),
    url(r'^matches/$', match_list, name='matches'),
    url(r'^matches/(?P<pk>[0-9]+)/$', match_detail, name='match'),
    url(r'^user/$', user_detail, name='user_management'),
    url(r'^token-auth/$', views.obtain_auth_token, name='token'),
]

