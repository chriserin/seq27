Feature: User signs in
  Scenario: User signs in
    Given a user
    And   I am on the signin page
    When  I provide credentials
    Then  I see songs index page

  Scenario: User signs in
    Given a user with songs
    And   I am on the signin page
    When  I provide credentials
    Then  I see songs index page
    And   I see songs
