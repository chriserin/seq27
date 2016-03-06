Feature: Artist creates scale

  @javascript
  Scenario: Artist creates chord at cursor
    Given an artist on the new song page
    When  I type the "mc" sequence
    When  I type the ":scale" command
    Then  I see a "c" major scale

  @javascript
  Scenario: Artist creates chord at cursor
    Given an artist on the new song page
    When  I type the "mc" sequence
    When  I type the ":scale minor" command
    Then  I see a "c" minor scale
