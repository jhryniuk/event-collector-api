Feature: Create user
  As not authorized user
  I need to be able to register user

  Scenario: Create user
    Given the request body is:
      """
      {"email":"test@test.pl","password":"test"}
      """
    And the "Content-Type" request header is "application/json"
    When I request "/api/users" using HTTP POST
    Then the response body contains JSON:
    """
    {"email":"test@test.pl"}
    """
