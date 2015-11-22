Feature: Artist alters notes

  @javascript
  Scenario: Artist lengthens latest note
    Given an artist on the new song page
    When  I type the "cn" sequence
    Then  I see the note on pitch "60" is part of the selected group
    When  I type the ">>" sequence
    Then  I see a note with length "192"
    When  I type the "5jcn" sequence
    Then  I see the note on pitch "55" is part of the selected group
    When  I type the "5kv" sequence
    When  I type the ">>" sequence
    Then  I see a note with length "384"

  @javascript
  Scenario: Artist lengthens latest note on new part
    Given an artist on the new song page
    When  I type the ":part 1!" command
    And   I type the "cn" sequence
    Then  I see the note on pitch "60" is part of the selected group
    When  I type the ">>" sequence
    Then  I see a note with length "192"

  @javascript
  Scenario: Artist lengthens latest note on new section
    Given an artist on the new song page
    When  I type the ":section 1!" command
    And   I type the "cn" sequence
    Then  I see the note on pitch "60" is part of the selected group
    When  I type the ">>" sequence
    Then  I see a note with length "192"

  @javascript
  Scenario: Artist shortens latest note
    Given an artist on the new song page
    When  I type the "cn" sequence
    And   I type the "<<" sequence
    Then  I see a note with length "48"

  @javascript
  Scenario: Artist deletes latest note
    Given an artist on the new song page
    When  I type the "cn" sequence
    And   I type the "dd" sequence
    Then  I do not see a note

  @javascript
  Scenario: Artist selects note group
    Given an artist on the new song page
    When  I type the "mccn" sequence
    Then  I see the note on pitch "60" is part of the selected group
    When  I type the "mecn" sequence
    Then  I see the note on pitch "64" is part of the selected group
    When  I type the "macn" sequence
    Then  I see the note on pitch "69" is part of the selected group
    When  I type the "[g" sequence
    Then  I see the note on pitch "64" is part of the selected group
    When  I type the "[g" sequence
    Then  I see the note on pitch "60" is part of the selected group
    When  I type the "]g" sequence
    Then  I see the note on pitch "64" is part of the selected group
    When  I type the "]g" sequence
    Then  I see the note on pitch "69" is part of the selected group

  @javascript
  Scenario: Artist moves note group down
    Given an artist on the new song page
    When  I type the "mccn" sequence
    Then  I see a note at beat 0 and pitch 60
    When  I type the "J" sequence
    Then  I see a note at beat 0 and pitch 59
    When  I type the "K" sequence
    Then  I see a note at beat 0 and pitch 60

  @javascript
  Scenario: Artist moves note group slightly right
    Given an artist on the new song page
    When  I type the "mccn" sequence
    Then  I see a note at tick 0 and pitch 60
    When  I type the "sL" sequence
    Then  I see a note at tick 48 and pitch 60
    When  I type the "sH" sequence
    Then  I see a note at tick 0 and pitch 60
    When  I type the "37sL" sequence
    Then  I see a note at tick 37 and pitch 60
    When  I type the "31sH" sequence
    Then  I see a note at tick 6 and pitch 60

  @javascript
  Scenario: Artist moves note group right by quarters
    Given an artist on the new song page
    When  I type the "mccn" sequence
    Then  I see a note at tick 0 and pitch 60
    When  I type the "qL" sequence
    Then  I see a note at tick 24 and pitch 60
    When  I type the "qH" sequence
    Then  I see a note at tick 0 and pitch 60
    When  I type the "3qL" sequence
    Then  I see a note at tick 72 and pitch 60
    When  I type the "3qH" sequence
    Then  I see a note at tick 0 and pitch 60

  @javascript
  Scenario: Artist moves note group right by thirds
    Given an artist on the new song page
    When  I type the "mccn" sequence
    Then  I see a note at tick 0 and pitch 60
    When  I type the "rL" sequence
    Then  I see a note at tick 32 and pitch 60
    When  I type the "rH" sequence
    Then  I see a note at tick 0 and pitch 60
    When  I type the "2rL" sequence
    Then  I see a note at tick 64 and pitch 60
    When  I type the "2rH" sequence
    Then  I see a note at tick 0 and pitch 60
