Feature: Midi goes different places

  @javascript
  Scenario: Song sends midi to different channels
    Given a signed in artist with a new song
    When  I type the "mccn" sequence
    And   I type the ":set channel=2" command
    And   I type the ":part 1!" command
    Then  I see that part "1" is active
    When  I type the "mccn" sequence
    And   I type the ":set channel=3" command
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear a note on each channel

  @javascript
  Scenario: User chooses a different midi output for a part and receives midi there
    Given a second output named "seq-27-output-B"
    And   a signed in artist with a new song
    When  I type the "mccn" sequence
    And   I type the ":set output=seq-27-output-B" command
    And   I set the tempo very high in order to shrink the test
    And   I press the space bar
    Then  I hear a note on the second output
