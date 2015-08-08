TEST_OUTPUT = "seq27-midi-output"

window.Midi = class Midi
  OFF = 0x80
  ON = 0x90

  @connections: new Map() #YES first use of Map
  @connect: ->
    midiPromise = navigator.requestMIDIAccess()

    midiPromise.then((access) ->
      outputIterator = access.outputs.values()
      while(output = outputIterator.next(); !output.done)
        Midi.connections.set(output.value.name, output.value)
    , ->
      console.log("midi failure")
    )

  @selectOutput: (name=TEST_OUTPUT) ->
    if Midi.connections.has(name)
      Midi.connections.get(name)
    else
      Midi.connections.values().next().value

  @outputNames: ->
    names = []
    keys = Midi.connections.keys()
    while(output = keys.next(); !output.done)
      names.push(output.value)
    return names

  @sendOn: (channel, pitch, velocity, timeFromNow, output=TEST_OUTPUT)->
    @send(ON, channel, pitch, velocity, timeFromNow, output)

  @sendOff: (channel, pitch, velocity, timeFromNow, output=TEST_OUTPUT)->
    @send(OFF, channel, pitch, velocity, timeFromNow, output)

  @send: (action, channel, pitch, velocity, timeFromNow=0, output)->
    output = @selectOutput(output)
    output.send [action ^ channel, pitch, velocity], timeFromNow
