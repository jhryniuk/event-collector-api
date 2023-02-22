Feature: Delete event
  As a user
  I should be able to delete event

  Scenario Outline: Delete event
    Given the following events exists in db:
      | name  | start date          | end date            |
      | test  | 2022-02-22T00:00:00 | 2022-02-28T00:00:00 |
      | test1 | 2022-02-22T00:00:00 | 2022-02-28T00:00:00 |
    And the "Content-Type" request header is "application/json"
    When I request "/api/events/<id>" using HTTP <method>
    Then the response code is <code>

    Examples:
      | id | method | code |
      | 1  | DELETE | 204  |
      | 2  | DELETE | 204  |
      | 3  | DELETE | 404  |
