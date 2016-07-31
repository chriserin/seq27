Feature: Artist navigates song

  @javascript
  Scenario: Artist plays a section
    Given an artist on the new song page
    And   I type the ":section 1" command
    Then  I see an "E3" error

  @javascript
  Scenario: Artist plays a section
    Given an artist on the new song page
    When  I type the ":section 1!" command
    And   I type the ":removesection" command
    Then  I see that sect 0 is active
    When  I type the ":section 1" command
    Then  I see an "E3" error
