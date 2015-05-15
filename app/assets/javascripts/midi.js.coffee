window.Midi = class Midi
  OFF = 0x80
  ON = 0x90
  @connections: {}
  @connect: ->
    midiPromise = navigator.requestMIDIAccess()
    midiPromise.then((access) ->
      firstOutput = access.outputs.values().next().value
      Midi.connections[firstOutput.name] = firstOutput
    , ->
      console.log("midi failure")
    )

  @primaryOutput: ->
    keys = Object.keys(Midi.connections)
    Midi.connections[keys[0]]

  @sendOn: (channel, pitch, velocity, timeFromNow)->
    @send(ON, channel, pitch, velocity, timeFromNow)

  @sendOff: (channel, pitch, velocity, timeFromNow)->
    @send(OFF, channel, pitch, velocity, timeFromNow)

  @send: (action, channel, pitch, velocity, timeFromNow=0)->
    @primaryOutput().send [action ^ channel, pitch, velocity], timeFromNow
