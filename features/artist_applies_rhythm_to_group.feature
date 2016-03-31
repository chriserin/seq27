Feature: Artist applies rhythm to group

  @javascript
  Scenario: Artist manipulates spacing between notes
    Given an artist on the new song page
    When  I type the "2cn" sequence
    And   I type the ":spacing xhx" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at beat 2 and pitch 60
    When   I type the ":spacing xwx" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at beat 4 and pitch 60
    When   I type the ":spacing x1x" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at beat 1 and pitch 60
    When   I type the ":spacing x2x" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at tick 48 and pitch 60
    When   I type the ":spacing x3x" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at tick 32 and pitch 60
    When   I type the ":spacing x4x" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at tick 24 and pitch 60

  @javascript
  Scenario: Artist manipulates spacing between notes in a complex way
    Given an artist on the new song page
    When  I type the "2cn" sequence
    And   I type the ":spacing x1.x" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at tick 144 and pitch 60
    When  I type the ":spacing xw1x" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at beat 5 and pitch 60

  @javascript
  Scenario: Artist manipulates spacing between more than 2 notes
    Given an artist on the new song page
    When  I type the "3cn" sequence
    And   I type the ":spacing xhx1x" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at beat 2 and pitch 60
    And   I see a note at beat 3 and pitch 60

  @javascript
  Scenario: Artist manipulates spacing over many notes with short description
    Given an artist on the new song page
    When  I type the "3cn" sequence
    And   I type the ":spacing xh" command
    Then  I see a note at beat 0 and pitch 60
    And   I see a note at beat 2 and pitch 60
    And   I see a note at beat 4 and pitch 60

  @javascript
  Scenario: Artist manipulates duration
    Given an artist on the new song page
    When  I type the "3cn" sequence
    And   I type the ":duration w,h,2" command
    Then  I see a note with length "384"
    Then  I see a note with length "192"
    Then  I see a note with length "48"

