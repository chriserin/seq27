Feature: Artist undos and redos changes

  @javascript
  Scenario: Artist moves note group down and uses undo
    Given an artist on the new song page
    When  I type the "mccn" sequence
    Then  I see a note at beat 0 and pitch 60
    When  I type the "J" sequence
    Then  I see a note at beat 0 and pitch 59
    When  I type the "J" sequence
    Then  I see a note at beat 0 and pitch 58
    When  I type the "u" sequence
    Then  I see a note at beat 0 and pitch 59
    When  I type the "u" sequence
    Then  I see a note at beat 0 and pitch 60
    When  I type the "U" sequence
    Then  I see a note at beat 0 and pitch 59
    When  I type the "U" sequence
    Then  I see a note at beat 0 and pitch 58
    When  I type the "2u" sequence
    Then  I see a note at beat 0 and pitch 60
    When  I type the "v2L" sequence
    And   I hit enter
    Then  I see a note at beat 2 and pitch 60
    When  I type the "J" sequence
    Then  I see a note at beat 2 and pitch 59
    When  I type the "J" sequence
    Then  I see a note at beat 2 and pitch 58
    When  I type the "u" sequence
    Then  I see a note at beat 2 and pitch 59
    When  I type the "u" sequence
    Then  I see a note at beat 2 and pitch 60
    When  I type the "u" sequence
    Then  I see a note at beat 0 and pitch 60

  @javascript
  Scenario: Artist undos on a different part
    Given an artist on the new song page
    When  I type the ":part 1!" command
    When  I type the "mccn" sequence
    Then  I see a note at beat 0 and pitch 60
    When  I type the "J" sequence
    Then  I see a note at beat 0 and pitch 59
    When  I type the "J" sequence
    Then  I see a note at beat 0 and pitch 58
    When  I type the "u" sequence
    Then  I see a note at beat 0 and pitch 59
    When  I type the "u" sequence
    Then  I see a note at beat 0 and pitch 60

  @javascript
  Scenario: Artist undos on a different part
    Given an artist on the new song page
    When  I type the ":part 1!" command
    When  I type the "mccn" sequence
    And   I type the "u" sequence
    Then  I do not see a note at beat 0 and pitch 60
