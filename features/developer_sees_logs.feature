Feature: Developer sees logs

  @javascript
  Scenario: An error is raised and the developer sees that in the console
    Given an artist on the new song page
    And  I type the ":throw" command
    Then I see a message with file name and line number
