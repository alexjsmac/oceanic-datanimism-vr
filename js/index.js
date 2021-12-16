AFRAME.registerComponent("audiohandler", {
  schema: {
    id: { default: "none" },
  },
  init: function () {
    this.el.addEventListener("click", async () => {
      generateElements();
      alterEveryOtherPath();

      if (Tone.Transport.state !== "started") {
        console.log("Starting playback");
        let text = document.querySelector("#begin-text");
        const mainMelodyPart = new Tone.Part(function (time, note) {
          console.log(note);
          synth.triggerAttackRelease(note.note, note.duration, time);
          text.setAttribute("text-geometry", "value: " + note.year);
        }, mainMelody).start(0);
        Tone.start();
        Tone.Transport.start();
      } else {
        console.log("Stopping playback");
        Tone.Transport.stop();
      }

      let box2 = document.querySelector("#box2")
      box2.setAttribute("animation__appear", "property: scale; to: 2 2 2; dur: 80000");
    });
  },
});
