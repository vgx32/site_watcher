from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
import unittest
import json
import pdb

alerts_name = "alerts"
alert_name = "alert"
matchest_name = "matches"
match_name = "match"
token_name = "token"
api_root_name = "api_root"

# Create your tests here.
_testAlert = {
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

    self.alerts_endpoint = reverse(alerts_name)
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
  
  @unittest.skip("not implemented yet")
  def test_api_root(self):
    self.fail('TODO: implementation not defined')

  @unittest.skip("not implemented yet")
  def test_api_schema(self):
    self.fail('TODO: implementation not defined')

  def create_alert(self, alert):
    return self.client.post(self.alerts_endpoint, alert, format='json')
    
  def verify_dict_contents(self, expected, acutal):
    for k in expected.keys():
      self.assertTrue(k in acutal)
      # print("expected %s , actual %s " %(expected[k], acutal[k]))
      self.assertEqual(acutal[k], expected[k])
   
  def test_create_alert(self):
    r = self.client.get(self.alerts_endpoint)
    self.assertEqual(r.status_code, status.HTTP_200_OK)
    self.assertEqual(r.data, [])
    r = self.create_alert(self.testAlert)
    self.assertEqual(r.status_code, status.HTTP_201_CREATED)
    self.testAlert['owner'] = self.user.username
    self.verify_dict_contents(self.testAlert, r.data)
   
  def test_create_with_required_fields(self):
    required_fields = {"root_url", "search_terms"}
    alert = self.testAlert
    for k in alert.keys():
      kval = alert[k]
      del alert[k]
      r = self.create_alert(alert)
      if k in required_fields:
        expected_response = {k : ['This field is required.']}
        self.assertEqual(r.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(r.data, expected_response)
      else:
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)
        # self.assertEqual(r.data, alert) verify default values?
      alert[k] = kval

  def test_get_all_alerts(self):
    toCreate = []
    for i in range(4):
      curAlert = dict(self.testAlert)
      curAlert["scrape_level"] += i
      r = self.create_alert(curAlert)
      self.assertEqual(r.status_code, status.HTTP_201_CREATED)
      toCreate.append(curAlert)
    r = self.client.get(self.alerts_endpoint)
    self.assertEqual(len(r.data), len(toCreate))
    for i in range(len(toCreate)):
      self.verify_dict_contents(toCreate[i], r.data[i])
    
  def test_get_alert(self):
    r = self.create_alert(self.testAlert)
    self.assertEqual(r.status_code, status.HTTP_201_CREATED)
    created = r.data
    alert_url = reverse(alert_name, args=[r.data['id']])
    r = self.client.get(alert_url)
    self.assertEqual(r.status_code, status.HTTP_200_OK)
    self.verify_dict_contents(self.testAlert, r.data)

  def test_edit_alert(self):
    r = self.create_alert(self.testAlert)
    self.assertEqual(r.status_code, status.HTTP_201_CREATED)
    alert_url = reverse(alert_name, args=[r.data['id']])
    self.testAlert['scrape_level']  +=1
    r = self.client.put(alert_url, self.testAlert, format='json')
    self.assertEqual(r.status_code, status.HTTP_200_OK)
    r = self.client.get(alert_url)
    self.assertEqual(r.status_code, status.HTTP_200_OK)
    self.verify_dict_contents(self.testAlert, r.data)
  
  def test_alert_nonexistant(self):
    alert_url = reverse(alert_name, args=[213789])
    r = self.client.get(alert_url)
    self.assertEqual(r.status_code, status.HTTP_404_NOT_FOUND)
    expected_response = {'detail' : 'Not found.'}
    self.assertEqual(r.data, expected_response)
    
  def test_delete_alert(self):
    r = self.create_alert(self.testAlert)
    self.assertEqual(r.status_code, status.HTTP_201_CREATED)
    alert_url = reverse(alert_name, args=[r.data['id']])
    r = self.client.delete(alert_url)
    self.assertEqual(r.status_code, status.HTTP_204_NO_CONTENT)
    r = self.client.get(alert_url)
    self.assertEqual(r.status_code, status.HTTP_404_NOT_FOUND)
    expected_response = {'detail' : 'Not found.'}
    self.assertEqual(r.data, expected_response)
  
  @unittest.skip("not implemented yet")
  def test_run_alert_search(self):
    self.fail('TODO: should I add an api to allow launching of a search?')

class MatchResultTest(APITestCase):
  def setUp(self):
    # super(MatchResultTest, self).setUp()
    # self.fail('TODO: implementation not defined')
    pass

  @unittest.skip("not implemented yet")
  def test_get_match_results(self):
    self.fail('TODO: implementation not defined')

  @unittest.skip("not implemented yet")
  def test_clear_results(self):
    self.fail('TODO: implementation not defined')

  @unittest.skip("not implemented yet")
  def test_delete_result(self):
    self.fail('TODO: implementation not defined')

  @unittest.skip("not implemented yet")
  def test_results_e2e(self):
    # todo
    self.fail('TODO: implementation not defined')

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

