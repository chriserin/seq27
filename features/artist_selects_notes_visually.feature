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

  @javascript
  Scenario: Artist sees visually selected area
    Given an artist on the new song page
    And   I type the "mc" sequence
    When  I press 'v'
    And   I type the "5j5l" sequence
    Then  I see a selected area from beat '0' to '6'
    And   I see a selected area from pitch '60' to '55'

  @javascript
  Scenario: Artist sees visually selected area
    Given an artist on the new song page
    And   I type the "mccn" sequence
    When  I press 'v'
    Then  I see a visually selected note at beat 0 and pitch 60
    When  I type the "K" sequence
    Then  I see a visually selected note at beat 0 and pitch 61
    When  I type the "KK" sequence
    Then  I see a visually selected note at beat 0 and pitch 63
