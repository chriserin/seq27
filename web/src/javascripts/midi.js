window.Midi = {}

Midi.TEST_OUTPUT = "seq27-midi-output"

Midi.OFF = 0x80
Midi.ON = 0x90

Midi.connections = new Map();//YES first use of Map
Midi.connect = function() {
  const midiPromise = navigator.requestMIDIAccess();

  midiPromise.then((access) => {
    const outputIterator = access.outputs.values();

    let output = null;
    for(let output of outputIterator)
      Midi.connections.set(output.name, output);
  }, () => {
    console.log("midi failure")
  })
}

Midi.selectOutput = function(name = Midi.TEST_OUTPUT) {
  if (isNaN(name)) {
    if (Midi.connections.has(name)) {
      return Midi.connections.get(name);
    } else {
      return Midi.connections.values().next().value;
    }
  } else {
    return Array.from(Midi.connections)[name][1];
  }
}

Midi.outputNames = function() {
  const names = [];
  const keys = Midi.connections.keys();

  for(let output of keys) {
    names.push(output);
  }

  return names;
}

Midi.indexFor = function(outputName) {

  const outputNames = Midi.outputNames();
  const outputIndex = outputNames.findIndex((o) => { return o == outputName; });

  return outputIndex;
}

Midi.sendOn = function(channel, pitch, velocity, timeFromNow, output=Midi.TEST_OUTPUT) {
  return Midi.send(Midi.ON, channel, pitch, velocity, timeFromNow, output);
}

Midi.sendOff = function(channel, pitch, velocity, timeFromNow, output=Midi.TEST_OUTPUT) {
  return Midi.send(Midi.OFF, channel, pitch, velocity, timeFromNow, output);
}

Midi.send = function(action, channel, pitch, velocity, timeFromNow=0, output) {
  const midiOutput = Midi.selectOutput(output);
  return midiOutput.send([action ^ channel, pitch, velocity], timeFromNow);
}
