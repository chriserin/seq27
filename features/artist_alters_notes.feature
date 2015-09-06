Feature: Artist alters notes

  @javascript
  Scenario: Artist lengthens latest note
    Given an artist on the new song page
    When  I type the "cn" sequence
    And   I type the ">>" sequence
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
