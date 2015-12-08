Feature: Artist copies and pastes notes

  @javascript
  Scenario: Artist yanks and pastes chord
    Given an artist on the new song page
    When  I type the "mcch" sequence
    Then  I see a major chord at middle "c"
    And   I type the "y" sequence
    And   I type the "ma" sequence
    And   I type the "p" sequence
    Then  I see a major chord at middle "a"
