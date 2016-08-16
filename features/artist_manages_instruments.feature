Feature: Artist manages instruments

  @javascript
  Scenario: Artist chooses an instrument
    Given an artist on the new song page
    When  there is a midi output available
    And   I type the ":addinst seq27-midi-output 7 digisynth" command
    And   I type the ":setinst digisynth" command
    Then  I see that the output "seq27-midi-output" is selected
    Then  I see that the current channel is "7"

  @javascript
  Scenario: Artist chooses an instrument
    Given an artist on the new song page
    When  I type the ":addinst nonexistant 7 digisynth" command
    Then  I see an "E5: No midi output named nonexistant" error

  @javascript
  Scenario: Artist chooses an instrument
    Given an artist on the new song page
    And   a second output named "seq-27-output-B"
    And   there is a midi output available
    When  I type the ":addinst seq27-midi-output 7 digisynth" command
    And   I type the ":addinst seq-27-output-B 11 analogsynth" command
    And   I type the ":newtemplate testtemp digisynth analogsynth" command
    And   I type the ":applytemplate testtemp" command
    Then  I see that the output "seq27-midi-output" is selected
    And   I see that the current channel is "7"
    When  I type the "]p" sequence
    Then  I see that the output "seq-27-output-B" is selected
    And   I see that the current channel is "11"
