Tone.Transport.bpm.value = 60;

// Melody //

let mainMelody = Array();
const scale = [
  "F",
  "Gb",
  "Ab",
  "Bb",
  "C",
  "Db",
  "Eb"
];
var notes = Array();
for (let i = 1; i < 7; i++) {
  scale.forEach((element) => {
    let note = element + i.toString();
    notes.push(note);
  });
}
Papa.parse(
  "https://raw.githubusercontent.com/datasets/sea-level-rise/master/data/epa-sea-level.csv",
  {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
      data = results.data;
      let bar = 0;
      for (let i = 0; i < data.length - 2; i++) {
        let year = data[i]["Year"];
        let note = Math.round((data[i]["CSIRO Adjusted Sea Level"]+1)*4);
        let beat = (i % 2) * 2;
        if (i != 0 && beat == 0) {
          bar += 1;
        }
        time = bar.toString() + ":" + beat.toString();
        mainMelody.push({year: year, time: time, note: notes[note], duration: "2n" });
      }
    },
  }
);

const synth = new Tone.Synth({
  oscillator: {
    volume: 5,
    count: 3,
    spread: 40,
    type: "fatsawtooth",
  },
})
const filter = new Tone.Filter(400, 'lowpass').toDestination();
const feedbackDelay = new Tone.FeedbackDelay(0.25, 0.75).toDestination();

synth.connect(filter);
filter.connect(feedbackDelay);

const panner = new Tone.Panner3D({
  panningModel: "HRTF",
  positionX: 0,
  positionY: 0,
  positionZ: 50,
}).toDestination();
feedbackDelay.connect(panner);


// Kick Drum //

const kickDrum = new Tone.MembraneSynth({
  volume: 6,
}).toDestination();

const kicks = [
  { time: "0:0" },
  { time: "0:3:2" },
  { time: "1:1" },
  { time: "2:0" },
  { time: "2:1:2" },
  { time: "2:3:2" },
  { time: "3:0:2" },
  { time: "3:1:" },
  { time: "4:0" },
  { time: "4:3:2" },
  { time: "5:1" },
  { time: "6:0" },
  { time: "6:1:2" },
  { time: "6:3:2" },
  { time: "7:0:2" },
  { time: "7:1:" },
];

let fullKicks = Array();
for (let i = 0; i < 8; i++) {
  kicks.forEach((element) => {
    let time = element.time;
    let timeNumbers = time.split(":");
    let bar = parseInt(timeNumbers[0]);
    bar = bar + 8 * i;
    timeNumbers = timeNumbers.slice(1);
    time = bar + ":" + timeNumbers.join(":");
    fullKicks.push({ time: time });
  });
}

// const kickPart = new Tone.Part(function (time) {
//   kickDrum.triggerAttackRelease("C1", "8n", time);
// }, fullKicks).start(0);
