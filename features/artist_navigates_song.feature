Feature: Artist navigates song

  @javascript
  Scenario: Artist sees error when navigating to non-existant section
    Given an artist on the new song page
    And   I type the ":section 1" command
    Then  I see an "E3" error

  @javascript
  Scenario: Artest removes section
    Given an artist on the new song page
    When  I type the ":section 1!" command
    And   I type the ":removesection" command
    Then  I see that sect 0 is active
    When  I type the ":section 1" command
    Then  I see an "E3" error

  @javascript
  Scenario: Artist navigates to next section
    Given an artist on the new song page
    When  I type the ":section 1!" command
    And   I type the "[s" sequence
    Then  I see that sect 0 is active
    When  I type the "]s" sequence
    Then  I see that sect 1 is active

  @javascript
  Scenario: Artist navigates to next section
    Given an artist on the new song page
    When  I type the ":part 1!" command
    And   I type the "[p" sequence
    Then  I see that part "0" is active
    When  I type the "]p" sequence
    Then  I see that part "1" is active
