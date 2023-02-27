Feature: Modify user
  As a user
  I should be able to remove

  Scenario Outline: Remove user by using delete endpoint
    Given the following people exists in db:
      | email                 | roles                      | password |
      | jan.hryniuk@xebia.com | [ROLE_ADMIN, ROLE_USER]    | test     |
      | jhryniuk@xebia.com    | [ROLE_USER]                | test     |
    And the "Content-Type" request header is "application/json"
    When I request "/api/users/<id>" using HTTP <method>
    Then the response code is <code>

    Examples:
      | id | method | code |
      | 1  | DELETE | 204  |
      | 2  | DELETE | 204  |
      | 3  | DELETE | 404  |
