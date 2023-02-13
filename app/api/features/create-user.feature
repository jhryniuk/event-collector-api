Feature: Create user
  In order to create use I need to be not authenticated user.


  Scenario: Create not existed user
    When I request "/api/users" using HTTP "POST"