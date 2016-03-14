from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APITestCase



# Create your tests here.

class AlertApiTests(APITestCase):

  def setup(self):
    self.testAlert = {
      "root_url" : "www.example.com",
      "scrape_level" : 3,
      "search_terms" : ["domain", "example"],
      "analysis_op" : "string_match",
      "notification_type": "none"
    }
    

  alerts_name = "alerts"
  alert_name = "alert"
  matchest_name = "matches"
  match_name = "match"

  def test_create_alert(self):
    alert_endpoint = reverse(self.alerts_name)
    r = self.client.get(alert_endpoint)
    self.assertTrue(status.is_success(r.status_code))
    self.assertEqual(r.data, [])

    r = self.client.post(alert_endpoint, self.testAlert)
    self.assertTrue(status.is_success(r.status_code))
    self.assertEqual(r.data, self.testAlert)
  
  def test_create_with_required_fields(self):
    print("TODO returning error when some fields missing")
    pass

  def test_edit_alert(self):
    pass

  def test_alert_nonexistant(self):
    print("TODO ")

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
    print("TODO: think about what to do for this case")
    pass
  