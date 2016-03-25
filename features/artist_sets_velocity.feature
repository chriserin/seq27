Feature: Artist sets velocity

  @javascript
  Scenario: Artist creates chord at cursor
    Given an artist on the new song page
    When  I type the "3cn" sequence
    And   I type the ":velocity 90,50" command
    Then  I see a note at beat 0 and pitch 60 and velocity 90
    And   I see a note at beat 1 and pitch 60 and velocity 50
    And   I see a note at beat 2 and pitch 60 and velocity 90
