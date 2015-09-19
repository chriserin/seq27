Feature: Artist selects notes visually

  @javascript
  Scenario: Artist selects notes from same pitch and deletes them
    Given an artist on the new song page
    When  I type the "5lmccn5lcn5lcn" sequence
    And   I press 'v'
    And   I type the "5h" sequence
    When  I press 'd'
    Then  I see only one note

  @javascript
  Scenario: Artist selects notes from same beat and deletes them
    Given an artist on the new song page
    When  I type the "5lmccn5jcn5jcn" sequence
    And   I press 'v'
    And   I press 'N'
    When  I press 'd'
    Then  I see only one note
