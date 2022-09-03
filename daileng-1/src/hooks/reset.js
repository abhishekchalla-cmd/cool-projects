const { windowMouseMoveFunction } = require("./mousemove");

const reset = () => {
  window.removeEventListener("mousemove", windowMouseMoveFunction);
};

module.exports = { reset };
