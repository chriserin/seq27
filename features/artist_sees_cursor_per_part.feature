Feature: Artist sees cursor per part

  @javascript
  Scenario: Artist sees cursor per part
    Given an artist on the new song page
    When  I type the "mc" sequence
    Then  I see the cursor is at middle c
    When  I type the ":part 1!" command
    And   I type the "md" sequence
    Then  I see the cursor is at middle d
    When  I type the ":part 0" command
    Then  I see the cursor is at middle c
    When  I type the ":part 1" command
    Then  I see the cursor is at middle d
