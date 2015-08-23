Feature: Artist explores song

  Background:
    Given a signed in artist with a new song
    When  I type the ":part 2!" command
    And   I type the ":section 2!" command
    And   I type the ":explore" command

  @javascript
  Scenario: Artist sees sections
    Then  I see 2 sections and 4 parts

  @javascript
  Scenario: Artist navigates to parts of sections
    Then I see that explorer cursor is on section 2 part 2
    When I press 'k'
    Then I see that explorer cursor is on section 2 part 1
    When I press 'k'
    Then I see that explorer cursor is on section 2
    When I press 'k'
    Then I see that explorer cursor is on section 1 part 2
    When I press 'k'
    Then I see that explorer cursor is on section 1 part 1

  @javascript
  Scenario: Artist rearranges sections
