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
        const mainMelodyPart = new Tone.Part(function (time, note) {
          console.log(note);
          synth.triggerAttackRelease(note.note, note.duration, time);
        }, mainMelody).start(0);
        Tone.start();
        Tone.Transport.start();
      } else {
        console.log("Stopping playback");
        Tone.Transport.stop();
      }

      beginText = document.querySelector("#begin-text");
      beginText.setAttribute("visible", false);
    });
  },
});
