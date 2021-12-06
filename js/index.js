Tone.Transport.bpm.value = 150

let mainMelody = Array(135);
const notes = ["F2", "G2", "A3", "B3", "C3", "D3", "E3", "F3", "G3", "A4", "B4", "C4", "D4", "E4", "F4", "G4"];
Papa.parse('https://raw.githubusercontent.com/datasets/sea-level-rise/master/data/epa-sea-level.csv', {
  header: true,
  download: true,
  dynamicTyping: true,
  complete: function(results) {
    data = results.data;
    let bar = 0;
    for (let i = 0; i < data.length-1; i++) {
      let note = Math.round(data[i]["CSIRO Adjusted Sea Level"]) + 1;
      let beat = i % 4;
      if (i != 0 && beat == 0){
        bar += 1;
      }
      time = bar.toString() + ":" + beat.toString();
      mainMelody[i] = {'time': time, 'note': notes[note], 'duration': '8n'};
    }
  }
});
console.log(mainMelody);

const mainMelody2 = [
  {'time': '0:0', 'note': 'G4', 'duration': '8n'},
  {'time': '0:0:2', 'note': 'F4', 'duration': '8n'},
  {'time': '0:1', 'note': 'D4', 'duration': '8n.'},
  {'time': '0:2', 'note': 'D4', 'duration': '8n'},
  {'time': '0:2:2', 'note': 'F4', 'duration': '8n.'},
  {'time': '0:3', 'note': 'G4', 'duration': '8n'},
  {'time': '0:3:2', 'note': 'A4', 'duration': '2n'},
  {'time': '2:0', 'note': 'A4', 'duration': '8n'},
  {'time': '2:0:2', 'note': 'G4', 'duration': '8n'},
  {'time': '2:1', 'note': 'F4', 'duration': '8n'},
  {'time': '2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '2:2:2', 'note': 'G4', 'duration': '8n'},
  {'time': '2:3', 'note': 'E4', 'duration': '8n'},
  {'time': '2:3:2', 'note': 'F4', 'duration': '2n'},
  {'time': '4:0', 'note': 'G4', 'duration': '8n'},
  {'time': '4:0:2', 'note': 'F4', 'duration': '8n'},
  {'time': '4:1', 'note': 'D4', 'duration': '8n'},
  {'time': '4:2', 'note': 'F4', 'duration': '8n'},
  {'time': '4:2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '4:3', 'note': 'G4', 'duration': '8n'},
  {'time': '4:3:2', 'note': 'A4', 'duration': '2n'},
  {'time': '5:2:2', 'note': 'G4', 'duration': '8n'},
  {'time': '5:3', 'note': 'A4', 'duration': '8n'},
  {'time': '5:3:2', 'note': 'B4', 'duration': '8n'},
  {'time': '6:0', 'note': 'C5', 'duration': '8n'},
  {'time': '6:1', 'note': 'B4', 'duration': '8n'},
  {'time': '6:1:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:2', 'note': 'B4', 'duration': '8n'},
  {'time': '6:2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:3', 'note': 'G4', 'duration': '8n'},
  {'time': '6:3:2', 'note': 'A4', 'duration': '1n'},
];
console.log(mainMelody2);

const synth2 = new Tone.Synth({
  oscillator : {
    volume: 5,
    count: 3,
    spread: 40,
    type : "fatsawtooth"
  }
}).toDestination();

const mainMelodyPart = new Tone.Part(function(time, note) {
  synth2.triggerAttackRelease(note.note, note.duration, time);
}, mainMelody).start('0:0');

AFRAME.registerComponent("audiohandler", {
  schema: {
    id: { default: "none" }
  },
  init: function() {
    this.el.addEventListener("click", async () => {
      generateElements();
      alterEveryOtherPath();

      if (Tone.Transport.state !== 'started') {
        console.log("Starting playback");
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
        console.log("Stopping playback")
      }
    });
  }
});
