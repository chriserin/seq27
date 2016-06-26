window.Panic = {}

Panic.panic = function(viewState, songState) {
  var activePart = SongState.activePart(songState, viewState);
  var channel = activePart.channel;
  var output = activePart.output;

  for(var i = 0; i < 120; i++) {
    Midi.sendOff(channel, i, 80, 0, output);
  }

  return viewState;
}
