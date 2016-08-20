Feature: Artist creates arpeggio

  @javascript
  Scenario: Artist sees argument type error
    Given an artist on the new song page
    When  I type the ":arpeggio major something udud" command
    Then  I see an "E6: second argument must be a number" error
