Feature: Artist explores song

  Background:
    Given a signed in artist with a new song
    When  I type the ":part 2!" command
    And   I type the ":section 2!" command
    And   I type the ":explore" command

  @javascript
  Scenario: Artist sees sections
    Then  I see 2 sections and 4 parts

  Scenario: Artist navigates to parts of sections
  Scenario: Artist rearranges sections
