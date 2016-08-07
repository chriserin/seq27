Feature: Artist duplicates section

  @javascript
  Scenario: Artist sees undo stack after duplicating section
    Given an artist on the new song page
    When  I type the "mccn" sequence
    And   I type the "J" sequence
    And   I type the ":duplicatesection" command
    Then  I see a note at beat 0 and pitch 59
    And   I type the "u" sequence
    Then  I see a note at beat 0 and pitch 60

  @javascript
  Scenario: Artist sees cursor when creating a part in old section implicitly
    Given an artist on the new song page
    When  I type the ":section 1!" command
    And   I type the ":part 1!" command
    And   I type the ":section 0" command
    Then  I see that section "0" is active
