window.Arrangement = {}

Arrangement.arrange = function(songState, sectionsArg) {
  const sections = sectionsArg.split(',')

  songState.arrangement = sections;

  return songState;
}
