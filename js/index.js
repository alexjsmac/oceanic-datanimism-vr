var playing = false;

AFRAME.registerComponent("audiohandler", {
  schema: {
    id: { default: "none" }
  },
  init: function() {
    var data = this.data;
    let audiosource = document.querySelector(data.id);

    this.el.addEventListener("click", async () => {
      // Re-initialize visuals
      generateElements();
      alterEveryOtherPath();

      // If audio isn't playing, start it
      if (!playing) {
        playing = true;
        await Tone.start()
        var notes = ["F2", "G2", "A3", "B3", "C3", "D3", "E3", "F3", "G3", "A4", "B4", "C4", "D4", "E4", "F4", "G4"];
        Papa.parse('https://raw.githubusercontent.com/datasets/sea-level-rise/master/data/epa-sea-level.csv', {
          header: true,
          download: true,
          dynamicTyping: true,
          complete: function(results) {
            data = results.data;
            const synth = new Tone.Synth().toDestination();
            const now = Tone.now()
            for (let i = 0; i < data.length-1; i++) {
              let note = Math.round(data[i]["CSIRO Adjusted Sea Level"]) + 1;
              synth.triggerAttackRelease(notes[note], "8n", now + i*0.5);
            }
          }
        });
        playing = false;
      }
    });
  }
});
