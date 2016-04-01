Feature: Artist squeezes group

  @javascript
  Scenario: Artist squeezes note group
    Given an artist on the new song page
    When I type the "mccn2lcnv2h" sequence
    And  I type the ":squeeze" command
    Then I see a note at beat 0 and pitch 60
    And  I see a note at beat 1 and pitch 60
    And  I see "2" notes with length "48"

  @javascript
  Scenario: Artist fills in gaps between notes by lengthening notes
    Given an artist on the new song page
    When  I type the "3cn" sequence
    And   I type the ":spacing xwxh" command
    And   I type the ":fill" command
    Then  I see a note with length "384"
    Then  I see a note with length "192"
    Then  I see a note with length "96"
