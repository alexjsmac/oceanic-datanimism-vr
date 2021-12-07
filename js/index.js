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
          synth2.triggerAttackRelease(note.note, note.duration, time);
        }, mainMelody).start(0);
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
        console.log("Stopping playback");
      }
    });
  },
});
