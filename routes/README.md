Event Management API Endpoints.

# Available API Endpoints

All endpoint starts with **/api**.

# Event endpoints

## Upcoming Events

url: **api/event/upcomingEvents**

method: **Get**

Input: **None**

Output: **Array of events having end date greater than or equal to today**

## Completed Events

url: **api/event/completedEvents**

method: **Get**

Input: **None**

Output: **Array of events having end date less than today**
