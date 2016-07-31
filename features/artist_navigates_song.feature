Feature: Artist navigates song

  @javascript
  Scenario: Artist plays a section
    Given an artist on the new song page
    And   I type the ":section 1" command
    Then  I see an "E3" error
