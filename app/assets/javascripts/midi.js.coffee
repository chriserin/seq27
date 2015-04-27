window.Midi = class Midi
  @connect: ->
    midiPromise = navigator.requestMIDIAccess()
    midiPromise.then( (access) ->
      Midi.output = access.outputs.values().next().value
    , ->
      console.log("midi failure")
    )
