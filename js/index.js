Tone.Transport.bpm.value = 150

let mainMelody = Array();
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
      let beat = (i % 2) * 2;
      if (i != 0 && beat == 0){
        bar += 1;
      }
      time = bar.toString() + ":" + beat.toString();
      mainMelody.push({'time': time, 'note': notes[note], 'duration': '4n'});
    }
  }
});

const synth2 = new Tone.Synth({
  oscillator : {
    volume: 5,
    count: 3,
    spread: 40,
    type : "fatsawtooth"
  }
}).toDestination();

const kickDrum = new Tone.MembraneSynth({
  volume: 6
}).toDestination();

const kicks = [
  { time: '0:0' },
  { time: '0:3:2' },
  { time: '1:1' },
  { time: '2:0' },
  { time: '2:1:2' },
  { time: '2:3:2' },
  { time: '3:0:2' },
  { time: '3:1:' },
  { time: '4:0' },
  { time: '4:3:2' },
  { time: '5:1' },
  { time: '6:0' },
  { time: '6:1:2' },
  { time: '6:3:2' },
  { time: '7:0:2' },
  { time: '7:1:' },
];

let fullKicks = Array();
for (let i = 0; i < 8; i++) {
  kicks.forEach(element => {
    let time = element.time;
    let timeNumbers = time.split(":")
    let bar = parseInt(timeNumbers[0]);
    bar = bar + 8 * i;
    timeNumbers = timeNumbers.slice(1);
    time = bar + ":" + timeNumbers.join(":");
    fullKicks.push({'time': time});
  })
}
console.log(fullKicks);

const kickPart = new Tone.Part(function(time){
  kickDrum.triggerAttackRelease('C1', '8n', time)
}, fullKicks).start(0);

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
        const mainMelodyPart = new Tone.Part(function(time, note) {
          synth2.triggerAttackRelease(note.note, note.duration, time);
        }, mainMelody).start(0);
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
        console.log("Stopping playback")
      }
    });
  }
});
