/* detect MIDI support from  http://jsfiddle.net/KeithMcMillenInstruments/z906bdLj/ */

var midi, data;
// request MIDI access
if(navigator.requestMIDIAccess){
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
}else {
  alert("No MIDI support in your browser.")
}

function onMIDISuccess(midiAccess) {
  // when we get a succesful response, run this code
  midi = midiAccess; // raw MIDI data, inputs, outputs, and sysex status

  var inputs = midi.inputs.values()

  // loop over all available inputs and listen for MIDI input
  for(var input = inputs.next(); input && !input.done; input = inputs.next()){

    // each time there is a midi message call the onMIDIMessage function
    input.value.onmidimessage = onMIDIMessage
  }
}

function onMIDIFailure(error){
  // when we get a failed response, run this code
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message){
  data = message.data // [command/channel, note, velocity] data
  console.log(data)
}



