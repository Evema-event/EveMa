Event Management Database models

## Available models

Details of all models:

## User Model

1.  userName -> String
2.  emailId -> String
3.  password -> String
4.  role -> Array
5.  otpData -> otp, expiresIn

## Profile Model

1.  userId -> ObjectId
2.  registeredEvents -> Array -> eventId
3.  registeredStalls -> Array -> { eventId, array -> stallId }
4.  registeredConferences -> Array -> {eventId, array -> conferenceId}
5.  firstName -> String
6.  lastName -> String
7.  gender -> String
8.  dateOfBirth -> Date
9.  country -> String
10. state -> String
11. cityName -> String
12. zipCode -> Number
13. areaOfInterest -> Array
14. designation -> String
15. companyName -> String
16. companyAddress -> String
17. contactNumber -> Number
18. image -> String
19. visitorConferences -> Array -> conferenceId
20. visitedStalls -> Array -> stallId

## Event Model

1. name -> String
2. description -> String
3. contactNumber -> Number
4. contactEmail -> String
5. price -> Number
6. startDate -> Date
7. endDate -> Date
8. startTime -> String
9. endTime -> String
10. venue -> String
11. registrationLastdate -> Date
12. registeredUsers -> Array -> userId
13. registeredStalls -> Array -> stallId
14. registeredConferences -> Array -> conferenceId

## Stall Model

1. productName -> String
2. description -> String
3. productDomain -> String
4. userId -> ObjectId
5. eventId -> ObjectId
6. visitors -> Array -> userId
7. links -> Array -> String
8. documents -> Array -> String
9. images -> Array -> String

## Conference Model

1. title -> String
2. theme -> String
3. description -> String
4. date -> Date
5. startTime -> String
6. endTime -> String
7. seatLimit -> Number
8. userId -> ObjectId
9. eventId -> ObjectId
10. registeredVisitors -> Array -> userId
