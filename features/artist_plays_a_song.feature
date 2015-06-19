Feature: Artist plays a song

  @javascript
  Scenario: Artist plays a song
    Given a signed in artist with a song
    When  I am on the song page
    And   there is a midi output available
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear the song (via midi)

  @javascript
  Scenario: Artist plays a song with two notes
    Given a signed in artist with a song with two notes
    When  I am on the song page
    And   there is a midi output available
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear the song with two notes

  @javascript
  Scenario: Artist plays a song and stops the song before it ends
    Given a signed in artist with a song
    When  I am on the song page
    And   there is a midi output available
    And   I press the space bar
    Then  I hear the a song interrupted by the space bar

  @javascript
  Scenario: Artist plays a song and the song loops
    Given a signed in artist with a song
    When  I am on the song page
    And   there is a midi output available
    And   I type the ":set loop=2" command
    And   I type the ":get loop" command
    Then  I see the value of the "loop" setting is 2
    When  I type the ":set beats=4" command
    And   I type the ":get beats" command
    Then  I see the value of the "beats" setting is 4
    When  I press the space bar
    Then  I hear the a song looped twice
