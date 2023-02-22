Feature: Create user
  As not authorized user
  I need to be able to register user

  Scenario Outline: Create user
    Given the request body is:
      """
      {"email":"<email>","password":"<password>"}
      """
    And the "Content-Type" request header is "application/json"
    When I request "/api/users" using HTTP POST
    Then the response body contains JSON:
      """
      {"email":"<email>"}
      """
    And the response code is 201

    Examples:
      | email            | password |
      | test@test.pl     | test     |
      | jhryniuk@test.pl | test     |
      | tester@test.pl   | test     |
