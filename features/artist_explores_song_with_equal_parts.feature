Feature: Artist explores song with equal parts

  Background:
    Given an artist on the new song page
    When I type the ":section 1!" command
    And  I type the ":part 1!" command
    And  I type the ":explore" command

  @javascript
  Scenario: Artist sees sections
    Then  I see 2 sections and 4 parts
