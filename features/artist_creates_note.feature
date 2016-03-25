Feature: Artist creates note

  @javascript
  Scenario: Artist creates chord at cursor
    Given an artist on the new song page
    When  I type the "2cn" sequence
    Then  I see a note at beat 0 and pitch 60 and velocity 80
    And   I see a note at beat 1 and pitch 60
    And   I see a note with velocity 80
