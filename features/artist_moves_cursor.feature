Feature: Artist moves cursor

  @javascript
  Scenario: Artist moves cursor in each direction
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor
    When  I press 'j'
    Then  I see the cursor has moved down
    When  I press 'k'
    Then  I see the cursor has moved up
    When  I press 'l'
    Then  I see the cursor has moved right
    When  I press 'h'
    Then  I see the cursor has moved left
    When  I press 'J'
    Then  I see that the cursor has not moved

  @javascript
  Scenario: Artist creates note at cursor
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor
    When  I press 'j'
    And   I press 'c'
    Then  I see a new note

  @javascript
  Scenario: Artist moves to middle C
    Given a signed in artist with a song
    When  I am on the song page
    Then  I see a cursor
    When  I press 'm'
    And   I press 'c'
    Then  I see the cursor is at middle c
