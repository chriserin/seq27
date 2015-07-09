Feature: Artist moves cursor

  @javascript
  Scenario: Artist moves cursor in each direction
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor in the top left corner
    When  I press 'j'
    Then  I see the cursor has moved down
    When  I press 'k'
    Then  I see the cursor has moved up
    When  I press 'l'
    Then  I see the cursor has moved right
    When  I press 'h'
    Then  I see the cursor has moved left
    When  I press 'J'
    Then  I see a cursor in the top left corner

  @javascript
  Scenario: Artist creates note at cursor
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor in the top left corner
    When  I press 'j'
    And   I press 'c'
    Then  I see a new note

  @javascript
  Scenario: Artist moves to middle C
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor in the top left corner
    When  I type the "mc" sequence
    Then  I see the cursor is at middle c

  @javascript
  Scenario: Artist moves to middle D
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor in the top left corner
    When  I type the "md" sequence
    Then  I see the cursor is at middle d

  @javascript
  Scenario: Artist moves to all notes one at a time
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor in the top left corner
    When  I type a sequence then I see the cursor at the right pitch:
      | sequence | midipitch |
      | m6c      | 72        |
      | mb       | 71        |
      | mak      | 70        |
      | ma       | 69        |
      | mgk      | 68        |
      | mg       | 67        |
      | mfk      | 66        |
      | mf       | 65        |
      | me       | 64        |
      | mdk      | 63        |
      | md       | 62        |
      | mck      | 61        |
      | mc       | 60        |
