Feature: Midi specs

  @midi
  Scenario: Midi object available
    Given a user on a song page
    Then  midi exists
