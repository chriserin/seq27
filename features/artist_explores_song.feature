Feature: Artist explores song

  @javascript
  Scenario: Artist sees sections
    Given a signed in artist with a new song
    When  I type the ":section 2!" command
    And   I type the ":explore" command
    Then  I see 2 sections
