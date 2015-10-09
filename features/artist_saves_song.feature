Feature: Artist saves song

  @javascript
  Scenario: Artist saves song
    Given an artist on the new song page
    When  I type the "mecn" sequence
    And   I type the ":write" command
    And   I see the command result "written"
    Then  I see that the song is in the database
