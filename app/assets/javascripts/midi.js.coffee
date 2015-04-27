window.Midi = class Midi
  ON = 0x90
  @connect: ->
    midiPromise = navigator.requestMIDIAccess()
    midiPromise.then( (access) ->
      Midi.output = access.outputs.values().next().value
    , ->
      console.log("midi failure")
    )

  @sendOn: (channel, pitch, velocity, timeFromNow)->
    @send(ON, channel, pitch, velocity, timeFromNow)

  @send: (action, channel, pitch, velocity, timeFromNow=0)->
    @output.send [action ^ channel, pitch, velocity], timeFromNow
