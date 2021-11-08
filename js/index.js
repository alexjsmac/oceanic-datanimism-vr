AFRAME.registerComponent("audiohandler", {
  schema: {
    id: { default: "none" }
  },

  init: function() {
    var data = this.data;
    let playing = false;
    let audiosource = document.querySelector(data.id);

    this.el.addEventListener("click", async () => {
      await Tone.start()
      console.log('audio is ready')
      var data;
      var notes = ["F2", "G2", "A3", "B3", "C3", "D3", "E3", "F3", "G3", "A4", "B4", "C4", "D4", "E4", "F4", "G4"];
      Papa.parse('../data/epa-sea-level.csv', {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
          data = results.data;

          //create a synth and connect it to the main output (your speakers)
          const synth = new Tone.Synth().toDestination();

          const now = Tone.now()

          //play a middle 'C' for the duration of an 8th note
          for (let i = 0; i < data.length-1; i++) {
            let note = Math.round(data[i]["CSIRO Adjusted Sea Level"]) + 1;
            synth.triggerAttackRelease(notes[note], "8n", now + i*0.5);
          }
        }
      });
      // if (!playing) {
      //   audiosource.components.sound.playSound();
      // } else {
      //   audiosource.components.sound.stopSound();
      // }
      //
      // playing = !playing;
      console.log("click event");
    });
  }
});
