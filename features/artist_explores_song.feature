Feature: Artist explores song

  Background:
    Given a signed in artist with a new song
    When  I type the ":part 1!" command
    And   I type the ":section 1!" command
    And   I type the ":explore" command

  @javascript
  Scenario: Artist sees sections
    Then  I see 2 sections and 4 parts

  @javascript
  Scenario: Artist navigates to parts of sections
    Then I see that explorer cursor is on arrangement index 1 part 1
    When I press 'k'
    Then I see that explorer cursor is on arrangement index 1 part 0
    When I press 'k'
    Then I see that explorer cursor is on arrangement index 1
    When I press 'k'
    Then I see that explorer cursor is on arrangement index 0 part 1
    When I press 'k'
    Then I see that explorer cursor is on arrangement index 0 part 0
    When I press 'k'
    Then I see that explorer cursor is on arrangement index 0
    When I press 'k'
    Then I see that explorer cursor is on arrangement index 0
    When I press 'j'
    Then I see that explorer cursor is on arrangement index 0 part 0
    When I press 'j'
    Then I see that explorer cursor is on arrangement index 0 part 1
    When I press 'j'
    Then I see that explorer cursor is on arrangement index 1
    When I press 'j'
    Then I see that explorer cursor is on arrangement index 1 part 0
    When I press 'j'
    Then I see that explorer cursor is on arrangement index 1 part 1
    When I press 'j'
    Then I see that explorer cursor is on arrangement index 1 part 1
    When I press 'k'
    And  I hit enter
    Then I see that section "1" is active
    And  I see that part "0" is active

  @javascript
  Scenario: Artist switches the active section
    When I press 'k'
    And  I press 'k'
    Then I see that explorer cursor is on arrangement index 1
    And  I hit enter
    Then I see that section "1" is active
    And  I see that part "0" is active

  @javascript
  Scenario: Artist moves last section to first
    Then I do see parts displayed in the explorer
    When I press 'h'
    Then I do not see parts displayed in the explorer
    When I press 'l'
    Then I do see parts displayed in the explorer

  @javascript
  Scenario: Artist moves last section to first
    When I press 'h'
    Then I see that explorer cursor is on arrangement index 1
    When I press 'v'
    And  I press 'k'
    Then I see that section 2 is displayed in the explorer first
    When I hit enter
    And  I press 'j'
    Then I see that explorer cursor is on arrangement index 1
