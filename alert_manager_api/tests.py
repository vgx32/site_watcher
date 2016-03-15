from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
import json
import pdb

alerts_name = "alerts"
alert_name = "alert"
matchest_name = "matches"
match_name = "match"
token_name = "token"
api_root_name = "api_root"

# Create your tests here.
testAlert = {
      "root_url" : "www.example.com",
      "scrape_level" : 3,
      "search_terms" : ["domain", "example"],
      "analysis_op" : "string_match",
      "notification_type": "none"
    }

class AlertApiTests(APITestCase):

  def setUp(self):
    self.testAlert = {
      "root_url" : "http://www.example.com",
      "scrape_level" : 3,
      "search_terms" : ["domain", "example"],
      "analysis_op" : "string_match",
      "notification_type": "none"
    }
    username = 'testhuser'
    password = 'password'


    self.user = User.objects.create_user(username, 
                                          email='test@example.com',
                                          password=password)
    self.credentials = {
      'username' : username,
      'password' : password
    }
    r = self.client.post(reverse(token_name), self.credentials )
    self.assertTrue('token' in r.data)
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + r.data['token'])
  
  def test_api_root(self):
    pass

  def test_api_schema(self):
    pass

  def test_create_alert(self):
    alert_endpoint = reverse(alerts_name)
    r = self.client.get(alert_endpoint)
    self.assertEqual(r.status_code, status.HTTP_200_OK)
    self.assertEqual(r.data, [])
    r = self.client.post(alert_endpoint, self.testAlert, format='json')
    # print(r.data)
    self.assertEqual(r.status_code, status.HTTP_201_CREATED)
    self.assertEqual(r.data, self.testAlert)
  
  def test_create_with_required_fields(self):
    pass

  def test_edit_alert(self):
    pass

  def test_alert_nonexistant(self):
    pass

  def test_delete(self):
    pass

  def test_get_all_alerts(self):
    pass

  def test_run_alert_search(self):
    pass

  def test_get_match_results(self):
    pass

  def test_clear_results(self):
    pass


  def test_results_e2e(self):
    pass

class AuthTests(APITestCase):

    def setUp(self):
      username = 'testhuser'
      password = 'password'
      self.user = User.objects.create_user(username, 
                                            email='test@example.com',
                                            password=password)
      self.credentials = {
        'username' : username,
        'password' : password
      }



    def test_obtain_token(self):
      r = self.client.post(reverse(token_name), self.credentials )
      self.assertEqual(r.status_code, status.HTTP_200_OK)
      self.assertTrue('token' in r.data)

    def test_access_with_token(self):
      r = self.client.post(reverse(token_name), self.credentials )
      self.assertTrue('token' in r.data)
      self.client.credentials(HTTP_AUTHORIZATION='Token ' + r.data['token'])
      r = self.client.get(reverse(api_root_name))
      self.assertEqual(r.status_code, status.HTTP_200_OK)

    def test_access_denied_without_token(self):
      r = self.client.get(reverse(api_root_name))
      self.assertTrue(status.is_client_error(r.status_code))


      