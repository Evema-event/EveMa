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
3.  registeredStalls -> Array -> stallId
4.  firstName -> String
5.  lastName -> String
6.  gender -> String
7.  dateOfBirth -> Date
8.  country -> String
9.  state -> String
10. cityName -> String
11. zipCode -> String
12. areaOfInterest -> Array
13. designation -> String
14. companyName -> String
15. companyAddress -> String
16. contactNumber -> String

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

## Stall Model

1. productName -> String
2. description -> String
3. productDomain -> String
4. userId -> ObjectId
5. eventId -> ObjectId

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
