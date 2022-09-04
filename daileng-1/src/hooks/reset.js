const { windowMouseMoveFunction } = require("./mousemove");

const reset = (layout) => {
  layout.circles.map((c) => {
    c.x = c.initialCoords[0];
    c.y = c.initialCoords[1];
    c.velocity = [0, 0];
    c.ignorePhysics = false;
  });
  layout.circles[0].velocity = [100, -100];
  window.removeEventListener("mousemove", windowMouseMoveFunction);
};

module.exports = { reset };
