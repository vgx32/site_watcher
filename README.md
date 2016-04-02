# Site Watcher

My hobby project to build a web app that periodically scrapes websites for specified search terms, similar to Google Alerts. 
I am aware this functionality can likely be pretty easily replicated in Google Alerts or another service -- my primary motivation
in building this is to gain a better understanding of the best practices in developing, deploying, and maintaining a 
multi-service Python web app.

## Overview

The overall goal of this project is to enable a user to passively monitor websites for changes in content. One possible user scenario:

Say you're looking to buy a used Honda Civic on Craigslist in your area, but you don't have time or patience to check the listings
every day. You log into the Site Watcher and add a new Alert, specifying the root URL you want to monitor (local Craigslist
vehicles for sale search), search terms ("Honda Civic", "used"), and how frequently you want a search to be run (daily). Once 
the Alert is created, the app will periodically scrape the root url and all the pages linked from that page for the specified 
search terms, sending you an email notification if any of those terms were seen along with the page they appeared on. Other possible scenarios include monitoring 
news websites for specific events or blog posts for occurences of certain topics.

## Version 0.1 Features

* List of terms Search
* 6hr - 7day scraping intervals, with 6hour granularity
* 1-3 levels deep search
* Single-page UI
* RESTFUL web service endpoint for all user actions 

## Design 

### TODO:

* (in progress) Build UX in React using Redux for state management
* Deploy front-end to AWS
* Research using Celery for running scraping tasks 
* Research using Scrapy or BeatifulSoup for scraping implementation
* Integrating scraping services on OpenShift with front-end
* Add Scrape-now functionality
* Add ssl 

### DONE:
* Django RESTful service for UI
* Django RESTful service for receiving and running scrape jobs



