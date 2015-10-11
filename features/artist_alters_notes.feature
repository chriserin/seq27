Feature: Artist alters notes

  @javascript
  Scenario: Artist lengthens latest note
    Given an artist on the new song page
    When  I type the "cn" sequence
    Then  I see the note on pitch "60" is part of the selected group
    When  I type the ">>" sequence
    Then  I see a note with length "192"

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
