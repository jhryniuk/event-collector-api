Feature: Modify user
  As a user
  I should be able to modify data related to user

  Scenario Outline: Modify user data by PUT method
    Given the following people exists in db:
      | email                 | roles                      | password |
      | jan.hryniuk@xebia.com | [ROLE_ADMIN, ROLE_USER]    | test     |
      | jhryniuk@xebia.com    | [ROLE_USER]                | test     |
    And the request body is:
      """
      {"email":"<email>"}
      """
    And the "Content-Type" request header is "application/json"
    When I request "/api/users/<id>" using HTTP <method>
    Then the response body contains JSON:
      """
      {"email":"<email>"}
      """
    And the response code is 200

    Examples:
      | id | email           | method |
      | 1  | test@test.pl    | PUT    |
      | 2  | tester@test.com | PUT    |
