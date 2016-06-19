Feature: Artist plays song components

  @javascript
  Scenario: Artist plays a song
    Given an artist on the new song page
    When  there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I set the tempo very high in order to shrink the test
    And   I type the "mecn" sequence
    And   I type the "zz" sequence
    Then  I hear the song (via midi)

  @javascript
  Scenario: Artist plays a part
    Given an artist on the new song page
    When  there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I set the tempo very high in order to shrink the test
    And   I type the "mecn" sequence
    And   I type the ":part 1!" command
    And   I type the ":set output=seq27-midi-output" command
    And   I type the "mccn" sequence
    And   I type the "zp" sequence
    Then  I hear only the current part

  @javascript
  Scenario: Artist plays a selection
    Given an artist on the new song page
    When  there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I set the tempo very high in order to shrink the test
    And   I type the "mecnmccn" sequence
    And   I type the "zs" sequence
    Then  I hear only the current selection

  @javascript
  Scenario: Artist plays a section
    Given an artist on the new song page
    When  there is a midi output available
    And   I type the ":set output=seq27-midi-output" command
    And   I set the tempo very high in order to shrink the test
    And   I type the "mecn" sequence
    And   I type the ":section 1!" command
    And   I type the "mccn" sequence
    And   I type the "zs" sequence
    Then  I hear only the current section
