Feature: Artist sees error

  @javascript
  Scenario: Artist sees error
    Given an artist on the new song page
    When  I type the ":something" command
    Then  I see a 'Not an editor command' error
