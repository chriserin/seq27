window.Panic = {}

Panic.panic = function(viewState) {
  var activePart = SongState.activePart()
  var channel = activePart.channel
  var output = activePart.output

  for(var i = 0; i < 120; i++) {
    Midi.sendOff(channel, i, 80, 0, output)
  }

  return viewState
}
