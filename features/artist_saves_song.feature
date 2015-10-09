Feature: Artist saves song

  @javascript
  Scenario: Artist saves song
    Given a signed in artist with a new song
    When  I type the "mecn" sequence
    And   I type the ":write" command
    And   I see the command result "written"
    And   I type the ":update" command
    And   I see the command result "updated"
    Then  I see that the song is in the database
