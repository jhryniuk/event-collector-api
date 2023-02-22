Feature: Modify event
  As a user
  I should be able to modify data related to event

  Scenario Outline: Modify event data by PUT method
    Given the following events exists in db:
      | name  | start date          | end date            |
      | test  | 2022-02-22T00:00:00 | 2022-02-28T00:00:00 |
      | test1 | 2022-02-22T00:00:00 | 2022-02-28T00:00:00 |
    And the request body is:
      """
      {"name":"<name>","startDateTime":"<start date>","endDateTime":"<end date>"}
      """
    And the "Content-Type" request header is "application/json"
    When I request "/api/events/<id>" using HTTP <method>
    Then the response body contains JSON:
      """
      {"name":"<name>","startDateTime":"<start date>","endDateTime":"<end date>"}
      """
    And the response code is 200

    Examples:
      | id | name          | start date                | end date                   | method |
      | 1  | test-renamed  | 2023-02-22T00:00:00+01:00 | 2023-02-28T00:00:00+01:00  | PUT    |
      | 2  | test1-renamed | 2023-02-22T00:00:00+01:00 | 2023-02-28T00:00:00+01:00  | PUT    |
