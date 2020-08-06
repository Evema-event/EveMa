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

## Verify User - Visitor

url: **api/user/verifyUser/visitor**

method: **Post**

Input: **userName, emailId**

Output: **Return Failed if user already exist else return Success**

## Verify User - Exhibitor

url: **api/user/verifyUser/exhibitor**

method: **Post**

Input: **userName, emailId**

Output: **Return Failed if user already exist else return Success**

## Signup - Visitor

url: **api/user/signup/visitor**

method: **Post**

Input: **Data in user model**

Output: **Token and user data stored in database**

## Signup - Exhibitor

url: **api/user/signup/exhibitor**

method: **Post**

Input: **Data in user model**

Output: **Token and user data stored in database**
