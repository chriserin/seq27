Feature: Midi goes different places

  @javascript
  Scenario: Song sends midi to different channels
    Given a signed in artist with a new song
    When  I type the "mccn" sequence
    And   I type the ":set channel=2" command
    And   I type the ":part 2!" command
    Then  I see that part "2" is active
    When  I type the "mccn" sequence
    And   I type the ":set channel=3" command
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear a note on each channel

  Scenario: User sees error messages when settings incorrect channels
  Scenario: User chooses a different midi output for a part and receives midi there
