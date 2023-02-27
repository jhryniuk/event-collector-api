Feature: Create event
  As a user
  I need to be able to create event

  Scenario Outline: Create event
    Given the request body is:
      """
      {"name":"<name>","startDateTime":"<start date>","endDateTime":"<end date>"}
      """
    And the "Content-Type" request header is "application/json"
    When I request "/api/events" using HTTP POST
    Then the response body contains JSON:
      """
      {"name":"<name>"}
      """
    And the response code is 201

    Examples:
      | name  | start date          | end date            |
      | test  | 2022-02-22T00:00:00 | 2022-02-28T00:00:00 |
      | test1 | 2022-02-22T00:00:00 | 2022-02-28T00:00:00 |
