const {
  getNewVectorsOnCollision,
  haveCollided,
  getCollisionTimeSquared,
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
const handleObjectCollisions = (objA) => {
  // Checking collisions with all objects
  for (let j = 0; j < collisionObjects.length; j++) {
    const objB = collisionObjects[j];
    if (objA.id !== objB.id && haveCollided(objA, objB)) {
      // objA and objB collided
      const [objANewVectors, objBNewVectors] = getNewVectorsOnCollision(
        objA,
        objB
      );
      Object.assign(objA, objANewVectors);
      Object.assign(objB, objBNewVectors);
    }
  }
};

// Identify when the next collision is going to happen
const getNextCollisionTime = () => {
  let leastTimeSquared = Infinity;

  for (let i = 0; i < collisionObjects.length - 1; i++) {
    const objA = collisionObjects[i];
    for (let j = i + 1; j < collisionObjects.length; j++) {
      const objB = collisionObjects[j];
      const collisionTimeSquared = getCollisionTimeSquared(objA, objB);
      if (collisionTimeSquared < leastTimeSquared)
        leastTimeSquared = collisionTimeSquared;
    }
  }

  // console.log(leastTimeSquared);

  return leastTimeSquared !== Infinity
    ? new Date().getTime() + Math.sqrt(leastTimeSquared) * 1000
    : Infinity;
};

module.exports = {
  hasCollided,
  handleObjectCollisions,
  getNextCollisionTime,
};
