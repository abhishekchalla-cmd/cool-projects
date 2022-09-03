const { setup: setupConfig } = require("../config");
const {
  registerCollisionObjects,
  registerObjects,
  startSimulation,
} = require("../engine");
const { createSetup } = require("../setups");
const { rootDiv } = require("../utils/dom");

const load = () => {
  // Generating phone setup (which is read from config)
  const container = {
    height: rootDiv.clientHeight,
    width: rootDiv.clientWidth,
    element: rootDiv,
  };
  const { collisionObjects, staticObjects } = createSetup(
    setupConfig,
    container
  );
  registerCollisionObjects(collisionObjects);
  registerObjects(staticObjects);

  startSimulation();
};

module.exports = { load };
