Feature: Artist plays a song

  @javascript
  Scenario: Artist plays a song
    Given a signed in artist with a song
    When  I am on the song page
    And   There is a midi output available
    And   I press the space bar
    Then  I hear the song (via midi)
