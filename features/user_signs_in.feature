Feature: User signs in
  @javascript
  Scenario: User sees note
    Given a user with songs
    And   I am on the signin page
    When  I provide credentials
    And   I click a song
    Then  I am on the song page
