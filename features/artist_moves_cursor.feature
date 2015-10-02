Feature: Artist moves cursor

  @javascript
  Scenario: Artist goes to top with gg
    Given an artist on the new song page
    When I type the "gg" sequence
    Then I see the cursor at beat 0 and pitch 127
    When I type the "G" sequence
    Then I see the cursor at beat 0 and pitch 0

  @javascript
  Scenario: Artist moves cursor to next note
    Given an artist on the new song page
    When  I type the "5lmccn" sequence
    Then  I see a note at beat 5 and pitch 60
    When  I type the "5hmccn" sequence
    Then  I see a note at beat 0 and pitch 60
    When  I type the "n" sequence
    Then  I see the cursor at beat 5 and pitch 60
    When  I type the "N" sequence
    Then  I see the cursor at beat 0 and pitch 60
    When  I type the "5kcn" sequence
    Then  I see a note at beat 0 and pitch 65
    When  I type the "n" sequence
    Then  I see the cursor at beat 0 and pitch 60
    When  I type the "N" sequence
    Then  I see the cursor at beat 0 and pitch 65

  @javascript
  Scenario: Artist moves cursor in each direction
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I press 'j'
    Then  I see the cursor has moved down
    When  I press 'k'
    Then  I see the cursor has moved up
    When  I press 'l'
    Then  I see the cursor has moved right
    When  I press 'h'
    Then  I see the cursor has moved left
    Then  I see a cursor in the top left corner
    # test that capitol J does nothing
    When  I press 'J'
    Then  I see a cursor in the top left corner

  @javascript
  Scenario: Artist creates note at cursor
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I press 'j'
    When  I type the "cn" sequence
    Then  I see a new note

  @javascript
  Scenario: Artist moves to middle C
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I type the "mc" sequence
    Then  I see the cursor is at middle c

  @javascript
  Scenario: Artist moves to middle D
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I type the "md" sequence
    Then  I see the cursor is at middle d

  @javascript
  Scenario: Artist moves to all notes in middle octave
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I type a sequence then I see the cursor at the right pitch:
      | sequence | midipitch |
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

  @javascript
  Scenario: Artist moves to all notes above middle octave
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I type a sequence then I see the cursor at the right pitch:
      | sequence | midipitch |
      | m9b      |119        |
      | m9ak     |118        |
      | m9a      |117        |
      | m9gk     |116        |
      | m9g      |115        |
      | m9fk     |114        |
      | m9f      |113        |
      | m9e      |112        |
      | m9dk     |111        |
      | m9d      |110        |
      | m9ck     |109        |
      | m9c      |108        |
      | m8b      |107        |
      | m8ak     |106        |
      | m8a      |105        |
      | m8gk     |104        |
      | m8g      |103        |
      | m8fk     |102        |
      | m8f      |101        |
      | m8e      |100        |
      | m8dk     | 99        |
      | m8d      | 98        |
      | m8ck     | 97        |
      | m8c      | 96        |
      | m7b      | 95        |
      | m7ak     | 94        |
      | m7a      | 93        |
      | m7gk     | 92        |
      | m7g      | 91        |
      | m7fk     | 90        |
      | m7f      | 89        |
      | m7e      | 88        |
      | m7dk     | 87        |
      | m7d      | 86        |
      | m7ck     | 85        |
      | m7c      | 84        |
      | m6b      | 83        |
      | m6ak     | 82        |
      | m6a      | 81        |
      | m6gk     | 80        |
      | m6g      | 79        |
      | m6fk     | 78        |
      | m6f      | 77        |
      | m6e      | 76        |
      | m6dk     | 75        |
      | m6d      | 74        |
      | m6ck     | 73        |
      | m6c      | 72        |

  @javascript
  Scenario: Artist moves to all notes below middle octave
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I type a sequence then I see the cursor at the right pitch:
      | sequence | midipitch |
      | m4b      | 59        |
      | m4ak     | 58        |
      | m4a      | 57        |
      | m4gk     | 56        |
      | m4g      | 55        |
      | m4fk     | 54        |
      | m4f      | 53        |
      | m4e      | 52        |
      | m4dk     | 51        |
      | m4d      | 50        |
      | m4ck     | 49        |
      | m4c      | 48        |
      | m3b      | 47        |
      | m3ak     | 46        |
      | m3a      | 45        |
      | m3gk     | 44        |
      | m3g      | 43        |
      | m3fk     | 42        |
      | m3f      | 41        |
      | m3e      | 40        |
      | m3dk     | 39        |
      | m3d      | 38        |
      | m3ck     | 37        |
      | m3c      | 36        |
      | m2b      | 35        |
      | m2ak     | 34        |
      | m2a      | 33        |
      | m2gk     | 32        |
      | m2g      | 31        |
      | m2fk     | 30        |
      | m2f      | 29        |
      | m2e      | 28        |
      | m2dk     | 27        |
      | m2d      | 26        |
      | m2ck     | 25        |
      | m2c      | 24        |
      | m1b      | 23        |
      | m1ak     | 22        |
      | m1a      | 21        |
      | m1gk     | 20        |
      | m1g      | 19        |
      | m1fk     | 18        |
      | m1f      | 17        |
      | m1e      | 16        |
      | m1dk     | 15        |
      | m1d      | 14        |
      | m1ck     | 13        |
      | m1c      | 12        |

  @javascript
  Scenario: Artist moves to all notes in middle octave
    Given an artist on the new song page
    Then  I see a cursor in the top left corner
    When  I type a sequence then I see the cursor at the right pitch:
      | sequence | midipitch |
      | mb       | 71        |
      | to       | 83        |
      | To       | 71        |
      | ta       | 81        |
      | Tc       | 72        |
      | ta       | 81        |
      | Tb       | 71        |
      | Ta       | 69        |
      | Td       | 62        |
      | Tc       | 60        |
      | Tf       | 53        |
      | Tg       | 43        |
      | Te       | 40        |
      | tb       | 47        |
      | ta       | 57        |
      | td       | 62        |
      | tc       | 72        |
      | tf       | 77        |
      | tg       | 79        |
      | te       | 88        |

