Feature: Artist saves song

  @javascript
  Scenario: Artist saves song
    Given a signed in artist with a new song
    When  I type the "mecn" sequence
    And   I type the ":write" command
    And   I see the command result "written"
    And   I type the ":name Life On Mars" command
    Then  I see the interface updated with the name "Life On Mars"
    When  I type the ":update" command
    And   I see the command result "updated"
    Then  I see that the song is in the database
    And   I see that the song has a name of "Life On Mars"
