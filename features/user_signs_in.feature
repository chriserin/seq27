Feature: User signs in
  Scenario: User signs in
    Given a user
    And   I am on the signin page
    When  I provide credentials
    Then  I see songs index page
