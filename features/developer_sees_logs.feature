Feature: Developer sees logs

  @javascript
  Scenario: An error is raised and the developer sees that in the console
    Given a signed in artist with a song
    When I am on the song page
    And  I type the ":throw" command
    Then I see a message with file name and line number
