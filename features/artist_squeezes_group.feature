Feature: Artist squeezes group

  @javascript
  Scenario: Artist squeezes note group
    Given an artist on the new song page
    When I type the "mccn2lcnv2h" sequence
    And  I type the ":squeeze" command
    Then I see a note at beat 0 and pitch 60
    And  I see a note at beat 1 and pitch 60
    And  I see "2" notes with length "48"
