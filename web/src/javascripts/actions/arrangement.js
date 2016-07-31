window.Arrangement = {}

Arrangement.arrange = function(songState, _, sectionsArg) {
  const sections = Arrangement.parseArrangementArgument(sectionsArg);

  songState.arrangement = sections;

  return songState;
}

Arrangement.parseArrangementArgument = function(arrangementArgument) {
 return arrangementArgument.split(',');
}
