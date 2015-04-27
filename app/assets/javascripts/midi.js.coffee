window.Midi = class Midi
  @connect: ->
    midiPromise = navigator.requestMIDIAccess()
    midiPromise.then( (access) ->
      Midi.output = access.outputs.values().next().value
    , ->
      console.log("midi failure")
    )

  @sendOnAt: (pitch, velocity, channel, timeFromNow)->
    ON = 0x90 ^ channel
    @output.send [ON, pitch, velocity], timeFromNow
