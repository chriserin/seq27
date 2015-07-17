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
    Then  I hear the song interrupted by the space bar

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
    And   I set the tempo very high in order to shrink the test
    When  I press the space bar
    Then  I hear the song looped twice

  @javascript
  Scenario: Artist plays a song with two sections
    Given a signed in artist with a song with two sections
    When  I am on the song page
    And   there is a midi output available
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear the song with both sections

  @javascript
  Scenario: Artist creates and plays a song with two sections (the second section loops)
    Given a signed in artist with a song
    When I am on the song page
    And  there is a midi output available
    And  I type the ":new" command
    #create a new section with the bang operator
    And  I type the ":section 2!" command
    Then I see that section "2" is active
    When I move to middle C and I create a note
    Then I see a new note with pitch "60"
    When I type the ":set loop=2" command
    #without the bang operator the section command will switch to the specified section
    And  I type the ":section 1" command
    And  I type the ":set loop=1" command
    And  I move to middle A and I create a note
    And  I set the tempo very high in order to shrink the test
    Then I see a new note with pitch "69"
    When I press the space bar
    Then I hear the each section of the song (and the second section looped)
