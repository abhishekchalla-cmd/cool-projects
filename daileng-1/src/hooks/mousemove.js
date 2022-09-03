const { moveObj } = require("../engine");

let windowMouseMoveFunction;

function startCollisions(targetElement) {
  targetElement.ignorePhysics = true;
  windowMouseMoveFunction = (e) => {
    moveObj(targetElement, {
      x: e.clientX - targetElement.radius,
      y: e.clientY - targetElement.radius,
    });
  };

  window.addEventListener("mousemove", windowMouseMoveFunction);
}

module.exports = { startCollisions, windowMouseMoveFunction };
