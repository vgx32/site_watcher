from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from alert_manager_api.models import Alert, MatchResult
import unittest
import json
import pdb

alerts_name = "alerts"
alert_name = "alert"
matches_name = "matches"
match_name = "match"
token_name = "token"
api_root_name = "api_root"
user_management_name = "user_management"

# Create your tests here.
_testAlert = {
      "root_url" : "www.example.com",
      "scrape_level" : 3,
      "search_terms" : ["domain", "example"],
      "analysis_op" : "string_match",
      "notification_type": "none"
    }

class AppSharedTestCase(APITestCase):


  def verify_dict_contents(self, expected, acutal):
    for k in expected.keys():
      self.assertTrue(k in acutal)
      self.assertEqual(acutal[k], expected[k])


class AlertMatchResultRoot(AppSharedTestCase):
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
  
  def create_alert(self, alert):
    return self.client.post(self.alerts_endpoint, alert, format='json')

class AlertApiTests(AlertMatchResultRoot):
  
  @unittest.skip("not implemented yet")
  def test_api_root(self):
    self.fail('TODO: implementation not defined')

  @unittest.skip("not implemented yet")
  def test_api_schema(self):
    self.fail('TODO: implementation not defined')

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

class MatchResultApiTest(AlertMatchResultRoot):
  def setUp(self):
    super(MatchResultApiTest, self).setUp()
    self.create_alert(self.testAlert)
    alert = Alert.objects.filter(owner=self.user)[0]
    self.alertInstance = alert
    match1 = {
      "alert" : alert,
      "owner" : self.user,
      "url" : alert.root_url,
      "result_context": "There was a long time when many domains where present in the world"
    }
    match2 = {
      "alert" : alert,
      "owner" : self.user,
      "url" : alert.root_url,
      "result_context": "Too many examples of the world crappy credentials make things bad"
    }
    secondAlertMatch = dict(match2)
    self.allMatches = []
    self.allMatches.append(match1)
    self.allMatches.append(match2)
    for m in self.allMatches:
      matchObj = MatchResult.objects.create(**m)
      m['alert'] = alert.id
      m['owner'] = self.user.username
      m['id'] = matchObj.id
    self.firstAlertMatches = list(self.allMatches)
    
    # add a match result for another alert
    r = self.create_alert(self.testAlert)
    secondAlert = Alert.objects.filter(id=r.data['id'])[0]
    secondAlertMatch['alert'] = secondAlert
    matchObj = MatchResult.objects.create(**secondAlertMatch)
    secondAlertMatch['alert'] = secondAlert.id
    secondAlertMatch['owner'] = self.user.username
    secondAlertMatch['id'] = matchObj.id
    self.allMatches.append(secondAlertMatch)

  def test_get_all_matches(self):
    matches_url = reverse(matches_name)
    r = self.client.get(matches_url)
    self.assertEqual(r.status_code, status.HTTP_200_OK)
    self.assertEqual(len(self.allMatches), len(r.data))
    for i in range(len(self.allMatches)):
      self.verify_dict_contents(self.allMatches[i], r.data[i])

  def test_get_match(self):
    for m in self.allMatches:
      match_url = reverse(match_name, args=[m['id']])
      r = self.client.get(match_url)
      self.assertEqual(r.status_code, status.HTTP_200_OK)
      self.verify_dict_contents(m, r.data)
      
  @unittest.skip("not implemented yet")
  def test_clear_matches(self):
    self.fail('TODO: implementation not defined')

  def test_delete_match(self):
    expected_response = {'detail' : 'Not found.'}
    for m in self.allMatches:
      match_url = reverse(match_name, args=[m['id']])
      r = self.client.delete(match_url)
      self.assertEqual(r.status_code, status.HTTP_204_NO_CONTENT)
      r = self.client.get(match_url)
      self.assertEqual(r.status_code, status.HTTP_404_NOT_FOUND)
      self.assertEqual(r.data, expected_response)

  def test_get_matches_for_alert(self):
    matches_url = reverse(matches_name)
    r = self.client.get(matches_url, {'alert' : self.alertInstance.id}, format='html')
    self.assertEqual(r.status_code, status.HTTP_200_OK)
    self.assertEqual(len(self.firstAlertMatches), len(r.data))
    for i in range(len(self.firstAlertMatches)):
      self.verify_dict_contents(self.firstAlertMatches[i], r.data[i])
  

  @unittest.skip("not implemented yet")
  def test_results_e2e(self):
    self.fail('TODO: implementation not defined')


class AuthTests(AppSharedTestCase):

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

    def verify_token_endpoint(self, credentials):
      r = self.client.post(reverse(token_name), credentials )
      self.assertEqual(r.status_code, status.HTTP_200_OK)
      self.assertTrue('token' in r.data)

    def test_obtain_token(self):
      self.verify_token_endpoint(self.credentials)

    def test_access_with_token(self):
      r = self.client.post(reverse(token_name), self.credentials )
      self.assertTrue('token' in r.data)
      self.client.credentials(HTTP_AUTHORIZATION='Token ' + r.data['token'])
      r = self.client.get(reverse(api_root_name))
      self.assertEqual(r.status_code, status.HTTP_200_OK)

    def test_access_denied_without_token(self):
      r = self.client.get(reverse(api_root_name))
      self.assertTrue(status.is_client_error(r.status_code))


    def test_create_new_user(self):
      user_data = {
        "username" : "bobbay",
        "password" : "a very secure password",
        "email" : "bla@somedomain.com"
      }
      credentials = {
        "username" : user_data["username"],
        "password" : user_data["password"]
      }
      

      r = self.client.post(reverse(user_management_name), user_data, format="json")
      self.assertEqual(r.status_code, status.HTTP_201_CREATED)
      # pdb.set_trace()
      del user_data["password"]
      self.verify_dict_contents(user_data, r.data)
      self.assertTrue("id" in r.data)
      self.verify_token_endpoint(credentials)
