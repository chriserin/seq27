Feature: Artist browses command history

  @javascript
  Scenario: Artist manipulates spacing between more than 2 notes
    Given an artist on the new song page
    When  I type the ":set tempo=120" command
    And   I type the ":set tempo=180" command
    And   I type the ":" sequence
    And   I press the "ArrowUp" key
    Then  I see a command ":set tempo=180" at the command line
    When  I press the "ArrowUp" key
    Then  I see a command ":set tempo=120" at the command line
    When  I hit enter
    And   I type the ":" sequence
    And   I press the "ArrowUp" key
    Then  I see a command ":set tempo=120" at the command line
