Feature: Artist plays a song

  @javascript
  Scenario: Artist plays a song
    Given an artist on the new song page
    When   there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I set the tempo very high in order to shrink the test
    And   I type the "mecn" sequence
    And   I press the space bar
    Then  I hear the song (via midi)

  @javascript
  Scenario: Artist plays a song with two notes
    Given an artist on the new song page
    When   there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I set the tempo very high in order to shrink the test
    And   I type the "mecnlcn" sequence
    And   I press the space bar
    Then  I hear the song with two notes

  @javascript
  Scenario: Artist plays a song and stops the song before it ends
    Given an artist on the new song page
    When  there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I type the "mecn" sequence
    And   I press the space bar
    Then  I hear the song interrupted by the space bar

  @javascript
  Scenario: Artist plays a song and the song loops
    Given an artist on the new song page
    When  there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I type the "mecn" sequence
    And   I type the ":set loop=2" command
    And   I type the ":get loop" command
    Then  I see the value of the "loop" setting is 2
    When  I type the ":set beats=4" command
    And   I type the ":get beats" command
    Then  I see the value of the "beats" setting is 4
    And   I set the tempo very high in order to shrink the test
    When  I press the space bar
    Then  I hear the song looped twice

  @javascript
  Scenario: Artist plays a song with two sections
    Given an artist on the new song page
    When  I type the ":set beats=4" command
    And   I type the ":set output=seq27-midi-output" command
    And   I type the "mecn" sequence
    And   I type the ":section 1!" command
    And   I type the "mecn" sequence
    And   there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear the song with both sections

  @javascript
  Scenario: Artist creates and plays a song with two sections (the second section loops)
    Given an artist on the new song page
    When  there is a midi output available
    And  I type the "mecn" sequence
    And  I type the ":new" command
    And  I type the ":section 1!" command
    And  I type the ":set output=seq27-midi-output" command
    Then I see that section "1" is active
    When I move to middle C and I create a note
    Then I see a new note with pitch "60"
    When I type the ":set loop=2" command
    And  I type the ":section 0" command
    And  I type the ":set output=seq27-midi-output" command
    And  I type the ":set loop=1" command
    And  I move to middle A and I create a note
    And  I set the tempo very high in order to shrink the test
    Then I see a new note with pitch "69"
    When I press the space bar
    Then I hear the each section of the song (and the second section looped)

  @javascript
  Scenario: Artist plays a song and the song loops
    Given an artist on the new song page
    When  there is a midi output available
    And  I type the ":set output=seq27-midi-output" command
    And   I type the "mecn" sequence
    And   I type the ":set loop=20" command
    And   I type the ":set beats=1" command
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear the note 20 times with 10 ms intervals

  @javascript
  Scenario: Artist plays a song with unequal part lengths for a section
    Given an artist on the new song page
    When I type the "mccn" sequence
    And  I type the ":set output=seq27-midi-output" command
    And  I type the ":set beats=1" command
    And  I type the ":part 1!" command
    And  I type the ":set beats=4" command
    And  I type the ":set output=seq27-midi-output" command
    And  I set the tempo very high in order to shrink the test
    And  I press the space bar
    Then I hear the first part repeated 4 times
