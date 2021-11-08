AFRAME.registerComponent("audiohandler", {
  schema: {
    id: { default: "none" }
  },

  init: function() {
    var data = this.data;
    let playing = false;
    let audiosource = document.querySelector(data.id);

    this.el.addEventListener("click", () => {
      if (!playing) {
        audiosource.components.sound.playSound();
      } else {
        audiosource.components.sound.stopSound();
      }

      playing = !playing;
      console.log("click event");
    });
  }
});
