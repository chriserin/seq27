Feature: Artist creates chord

  @javascript
  Scenario: Artist creates chord at cursor
    Given an artist on the new song page
    When  I type the "mc" sequence
    And   I type the "ch" sequence
    Then  I see a major chord at middle "c"
    When  I type the ">>" sequence
    Then  I see "3" notes with length "192"

  @javascript
  Scenario: Artist creates chord at cursor
    Given an artist on the new song page
    When  I type the "mc" sequence
    And   I type the "cm" sequence
    Then  I see a minor chord at middle "c"
