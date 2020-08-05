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

## Verify User

url: **api/user/verifyUser**

method: **Post**

Input: **userName, emailId**

Output: **Return Failed if user already exist else return Success**

## Signup

url: **api/user/signup**

method: **Post**

Input: **Data in user model**

Output: **Token and user data stored in database**
