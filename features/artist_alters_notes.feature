Feature: Artist alters notes

  @javascript
  Scenario: Artist lengthens note
    Given a signed in artist with a new song
    When  I press 'c'
    And   I type the ">>" sequence
    Then  I see a note with length "192"

  @javascript
  Scenario: Artist shortens note
    Given a signed in artist with a new song
    When  I press 'c'
    And   I type the "<<" sequence
    Then  I see a note with length "48"

  Scenario: Artist deletes note
