Feature: Artist selects notes visually

  @javascript
  Scenario: Artist selects note and deletes it
    Given an artist on the new song page
    When  I type the "5lmccn5lcn5lcn" sequence
    And   I press 'v'
    And   I type the "5h" sequence
    When  I press 'd'
    Then  I see only one note
