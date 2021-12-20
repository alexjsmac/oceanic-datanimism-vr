let sampleOrder = {
  "#box1": "#box2",
  "#box2": "#box3",
  "#box3": "#box4",
  "#box4": "#box5",
  "#box5": "#box6",
  "#box6": "#box7",
  "#box7": "#box8",
  "#box8": "#box9",
  "#box9": "#box10"
};

let maxSpheres = 10;

AFRAME.registerComponent("audiohandler", {
  schema: {
    id: { default: "none" },
  },

  init: function () {
    this.el.addEventListener("click", async () => {
      let text = document.querySelector("#mainText");

      // Initiate flying spheres
      generateElements(maxSpheres, maxSpheres-5);
      alterEveryOtherPath(maxSpheres-5);
      maxSpheres += 2;

      if (Tone.Transport.state !== "started") {
        console.log("Starting playback");
        const mainMelodyPart = new Tone.Part(function (time, note) {
          console.log(note);
          synth.triggerAttackRelease(note.note, note.duration, time);
          text.setAttribute("text-geometry", "value: " + note.year);
        }, mainMelody).start(0);
        Tone.start();
        Tone.Transport.start();
      }

      let selector = sampleOrder[this.data.id];
      let nextSample = document.querySelector(selector)
      if (nextSample != null) {
        nextSample.setAttribute("animation__appear", "property: scale; to: 2 2 2; dur: 800");
      }

      if (this.data.id !== "#box1") {
        let ocean = document.querySelector("a-ocean");
        let width = parseInt(ocean.getAttribute("width"));
        width += 10;
        let depth = parseInt(ocean.getAttribute("depth"));
        depth += 10;
        ocean.setAttribute("width", width.toString());
        ocean.setAttribute("depth", depth.toString());
      }
    });
  },
});
