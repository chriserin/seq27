Feature: User signs in
  Scenario: User signs in
    Given a user
    And   I am on the signin page
    When  I provide credentials
    Then  I see songs index page

  Scenario: User sees songs
    Given a user with songs
    And   I am on the signin page
    When  I provide credentials
    Then  I see songs index page
    And   I see songs

  @javascript
  Scenario: User sees note
    Given a user with songs
    And   I am on the signin page
    When  I provide credentials
    Then  I see songs index page
    When  I click a song
    Then  I am on the song page
    And   I see a note
