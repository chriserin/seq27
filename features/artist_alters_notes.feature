Feature: Artist alters notes

  @javascript
  Scenario: Artist lengthens latest note
    Given a signed in artist with a new song
    When  I press 'c'
    And   I type the ">>" sequence
    Then  I see a note with length "192"

  @javascript
  Scenario: Artist shortens latest note
    Given a signed in artist with a new song
    When  I press 'c'
    And   I type the "<<" sequence
    Then  I see a note with length "48"

  @javascript
  Scenario: Artist deletes latest note
    Given a signed in artist with a new song
    When  I press 'c'
    And   I type the "dd" sequence
    Then  I do not see a note
