TEST_OUTPUT = "seq27-midi-output"

window.Midi = class Midi
  OFF = 0x80
  ON = 0x90
  @connections: {}
  @connect: ->
    midiPromise = navigator.requestMIDIAccess()

    midiPromise.then((access) ->
      outputIterator = access.outputs.values()
      while(output = outputIterator.next(); !output.done)
        Midi.connections[output.value.name] = output.value
    , ->
      console.log("midi failure")
    )

  @primaryOutput: ->
    keys = Object.keys(Midi.connections)
    if keys.indexOf(TEST_OUTPUT) >= 0
      keyIndex = keys.indexOf(TEST_OUTPUT)
      Midi.connections[TEST_OUTPUT]
    else
      Midi.connections[keys[0]]

  @sendOn: (channel, pitch, velocity, timeFromNow)->
    @send(ON, channel, pitch, velocity, timeFromNow)

  @sendOff: (channel, pitch, velocity, timeFromNow)->
    @send(OFF, channel, pitch, velocity, timeFromNow)

  @send: (action, channel, pitch, velocity, timeFromNow=0)->
    output = @primaryOutput()
    output.send [action ^ channel, pitch, velocity], timeFromNow
