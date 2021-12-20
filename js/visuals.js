let objectContainer = document.querySelector("#object-container");

function generateElements(y, y2) {
  let totalRotations = getRandomNumber(1, y);
  let totalSteps = getRandomNumber(1, y2);
  for (let i = 1; i <= totalRotations; i++) {
    let currentRotation = (360 / totalRotations) * i;
    let rotateContainer = document.createElement("a-entity");
    rotateContainer.setAttribute("rotation", {
      x: 0,
      y: 0,
      z: currentRotation,
    });
    for (let j = 1; j <= totalSteps; j++) {
      let evenDistance = j / totalSteps;
      let currentSize = j / totalSteps;
      let circleElementContainer = document.createElement("a-entity");
      circleElementContainer.setAttribute(
        "class",
        "circleElementContainer" + j
      );
      circleElementContainer.setAttribute("position", {
        x: 0,
        y: evenDistance,
        z: 0,
      });
      let circleElement = document.createElement("a-entity");
      circleElement.setAttribute("class", "circleElement" + j);
      circleElement.setAttribute("scale", {
        x: currentSize,
        y: currentSize,
        z: currentSize,
      });
      // circleElement.setAttribute('material', {color: "blue", metalness: 0, roughness: 0})
      circleElement.setAttribute("geometry", {
        primitive: "sphere",
        radius: 0.2,
      });
      circleElement.setAttribute("animation__yoyo", {
        property: "vec33value",
        dir: "normal",
        dur: currentSize * 10000,
        easing: "linear",
        loop: true,
        to: "0 -200 0",
      });
      circleElementContainer.appendChild(circleElement);
      rotateContainer.appendChild(circleElementContainer);
    }
    objectContainer.appendChild(rotateContainer);
  }
}

function alterEveryOtherPath(y) {
  let totalSteps = getRandomNumber(1, y);
  let path;
  for (let i = 0; i <= totalSteps; i++) {
    let circleRing = document.getElementsByClassName("circleElement" + i);
    let valueOne = getRandomNumber(21, -10);
    let valueTwo = getRandomNumber(21, -10);
    let randomDuration = getRandomNumber(6, 5);
    for (let j = 0; j < circleRing.length; j++) {
      if (j % 2 === 0) {
        path = [
          [0, 0, 0],
          [valueOne, valueTwo, valueOne],
          [valueTwo, valueOne, valueTwo],
        ];
      } else {
        path = [
          [0, 0, 0],
          [valueTwo, valueOne, valueTwo],
          [valueOne, valueTwo, valueOne],
        ];
      }
      circleRing[j].setAttribute("alongpath", {
        path: path
          .map(function (x) {
            return x.join(",");
          })
          .join(", "),
        closed: true,
        dur: randomDuration * 1000,
        loop: true,
      });
    }
  }
}

function getRandomNumber(x, y) {
  return Math.floor(Math.random() * x + y);
}

function getRandomColor() {
  let varters = "0123456789abcdef";
  let randomColor = "";
  for (let i = 0; i < 6; i++) {
    randomColor += varters[Math.floor(Math.random() * 16)];
  }
  return "#" + randomColor;
}

function getRandomShape() {
  let shapes = ["sphere", "octahedron", "icosahedron", "torus", "tetrahedron"];
  return shapes[Math.floor(Math.random() * shapes.length)];
}
