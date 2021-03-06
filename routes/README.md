Event Management API Endpoints.

# Available API Endpoints

All endpoint starts with **/api**.

# Event endpoints

## Upcoming Events

url: **api/event/upcomingEvents**

method: **Get**

token: **Not required**

Input: **None**

Output: **Array of events having end date greater than or equal to today**

## Completed Events

url: **api/event/completedEvents**

method: **Get**

token: **Not required**

Input: **None**

Output: **Array of events having end date less than today**

## Add event

url: **api/event/addEvent**

method: **Post**

token: **Required**

Input: **All data from event model except registeredUsers and registeredStalls**

Output: **If success send event data else throw error**

## Delete event

url: **api/event/deleteEvent/{eventId}**

method: **Delete**

token: **Required**

Input: **None**

Output: **If success send event data else throw error**

## Register event

url: **api/event/registerEvent/{eventId}**

method: **Put**

token: **Required**

Input: **None**

Output: **If success send event data else throw error**

## Get VisitorList

url: **api/event/visitorList/{eventId}**

method: **get**

token: **Required**

Input: **None**

Output: **If success, send all visitor details if it is an organiser else throw error**

## NotifyUsers

url: **api/event/notifyUsers/{eventId}**

method: **post**

token: **Required**

Input: **subject,body,users(Array must contain Visitor or Exhibitor or Both)**

Output:**Return Failed if error else Success**

# User endpoints

## Verify User

url: **api/user/verifyUser**

method: **Post**

token: **Not required**

Input: **userName, emailId**

Output: **Return Failed if user already exist else return Success**

## Signup

url: **api/user/signup**

method: **Post**

token: **Not required**

Input: **user data and profile data in model except otpData, userId, registeredEvents and registeredStalls**

Output: **Token and user data stored in database**

## Login

url: **api/user/login**

method: **Post**

token: **Not required**

Input: **userName, password**

Output: **Token and user data stored in database**

## Forget Password

url: **api/user/forgetPassword**

method: **Post**

token: **Not required**

Input: **emailId**

Output: **Otp will send to email**

## Reset Password

url: **api/user/resetPassword**

method: **Put**

token: **Not required**

Input: **emailId, password, otp**

Output: **If OTP is correct send Success else throw error**

## Change Password

url: **api/user/changePassword**

method: **Put**

token: **Required**

Input: **oldPassword, newPassword**

Output: **If oldPassword is correct send Success else throw error**

## Get Profile

url: **api/user/getProfile**

method: **Get**

token: **Required**

Input: **None**

Output: **For visitor and exhibitor send both user and profile model for organizer send user model**

## Update Profile

url: **api/user/updateProfile**

method: **Put**

token: **Required**

Input: **profile data in model except registeredEvents and registeredStalls**

Output: **Update profile data stored in database**

## Update Profile Image

url: **api/user/updateProfileImage**

method: **Put**

token: **Required**

Input: **profile image with name of file**

Output: **Update profile data stored in database**

## switchUser

url: **api/user/switchUser**

method: **post**

token: **Required**

Input: **password**

Output:**Return Failed if error else return Success**

# Stall endpoints

## Get Stalls

url: **api/stall/getStalls/{eventId}**

method: **get**

token: **Required**

Input: **None**

Output: **If success send all stall data with exhibitor details else throw error**

## Register stall

url: **api/stall/registerStall/{eventId}**

method: **post**

token: **Required**

Input: **all data from stall model except userId and eventId**

Output: **If success send stall data else throw error**

## Delete Stalls

url: **api/stall/deleteStall/{stallId}**

method: **delete**

token: **Required**

Input: **None**

Output: **If success send stall data else throw error**

## Add additional details to Stalls

url: **api/stall/addinfo/{stallId}**

method: **put**

token: **Required**

Input: **url, document, image (all fileds are optional and upto 1 in each for a request)**

Output: **If success send stall data else throw error**

## Add visitors to Stalls

url: **api/stall/addvisitor/{stallId}**

method: **put**

token: **Not required**

Input: **userId of visitor**

Output: **If success send stall data else throw error**

## Get VisitorList

url: **api/stall/getvisitors/{stallId}**

method: **get**

token: **Required**

Input: **None**

Output: **If success, send all visitor details if it is an organiser or exhibitor else throw error**

# Conference endpoints

## Get Conference

url: **api/conference/getConferences/{eventId}**

method: **get**

token: **Required**

Input: **None**

Output: **If success send all conference data with exhibitor details else throw error**

## Register Conference

url: **api/conference/registerConference/{eventId}**

method: **post**

token: **Required**

Input: **all data from conference model except userId and eventId**

Output: **If success send conference data else throw error**

## Delete Conference

url: **api/conference/deleteConference/{conferenceId}**

method: **delete**

token: **Required**

Input: **None**

Output: **If success send conference data else throw error**

## Visitor register for conference

url: **api/conference/visitorConference/{conferenceId}**

method: **put**

token: **Required**

Input: **None**

Output: **If success send conference data else throw error**

## Get visitor list

url: **api/conference/getvisitors/{conferenceId}**

method: **get**

token: **Required**

Input: **None**

Output: **If success send list of visitor details if it is an organizer or exhibitor else throw error**
