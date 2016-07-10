window.Arrangement = {}

Arrangement.arrange = function(songState, _, sectionsArg) {
  const sections = sectionsArg.split(',')

  songState.arrangement = sections;

  return songState;
}
