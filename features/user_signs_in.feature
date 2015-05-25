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

  @javascript
  Scenario: Artist plays a song
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a note
    When  I type the ":new" command
    Then  I do not see a note
