const { stopSim } = require("./controls");
const {
  getNewVectorsOnCollision,
  haveCollided,
  getCollisionTime,
} = require("./math-helpers");
const { collisionObjects } = require("./vars");

// Has the object collided with any other object
const hasCollided = (object) => {
  for (const co of collisionObjects) {
    const result = haveCollided(object, co);
    if (result) return result;
  }
};

// Handle collisions
const handleObjectCollisions = (objA, objB) => {
  if (objA.id !== objB.id && haveCollided(objA, objB)) {
    // objA and objB collided
    const [objANewVectors, objBNewVectors] = getNewVectorsOnCollision(
      objA,
      objB
    );
    Object.assign(objA, objANewVectors);
    Object.assign(objB, objBNewVectors);
  }
};

// Identify when the next collision is going to happen
const getNextCollisions = () => {
  let leastTime = Infinity,
    pairs = [];

  for (let i = 0; i < collisionObjects.length - 1; i++) {
    const objA = collisionObjects[i];
    for (let j = i + 1; j < collisionObjects.length; j++) {
      const objB = collisionObjects[j];
      const collisionTime = getCollisionTime(objA, objB);
      if (collisionTime < leastTime) {
        leastTime = collisionTime;
        pairs.splice(0, pairs.length);
        pairs.push([objA.id, objB.id]);
      } else if (collisionTime === leastTime && collisionTime !== Infinity) {
        pairs.push([objA.id, objB.id]);
      }
    }
  }

  return {
    time:
      leastTime !== Infinity
        ? new Date().getTime() + Math.sqrt(leastTime) * 1000
        : Infinity,
    pairs,
  };
};

module.exports = {
  hasCollided,
  handleObjectCollisions,
  getNextCollisions,
};
