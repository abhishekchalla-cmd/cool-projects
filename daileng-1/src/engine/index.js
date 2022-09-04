const config = require("../config");
const {
  objects,
  objectsMap,
  collisionObjects,
  collisionObjectsMap,
  getNextCollisionTime,
  setNextCollisionTime,
  setNextCollisionPairs,
  getNextCollisionPairs,
  setContainer,
} = require("./vars");
const {
  hasCollided,
  handleObjectCollisions,
  getNextCollisions,
} = require("./collision");
const { getIsStopped, stopSim } = require("./controls");

const worldConfig = {
  frictionCoefficient: 0,
  ...config.world,
};

const moveObj = (object) => {
  // Check collisions for cursor circle
  if (hasCollided(object)) {
    handleObjectCollisions(object);
    getNextCollisions();
  }
};

const registerObjects = (_objects) => {
  for (const object of _objects) {
    let existingObject = objectsMap[object.id];
    if (!existingObject) existingObject = objectsMap[object.id] = object;
    else Object.assign(existingObject, object);
  }

  objects.splice(0, objects.length);
  objects.push(...Object.values(objectsMap));
};
const unregisterObject = (objectId) => {
  delete objectsMap[objectId];
};

const registerCollisionObjects = (objects) => {
  // Register objects
  registerObjects(objects);

  // Register as collision objects
  for (const object of objects)
    collisionObjectsMap[object.id] = objectsMap[object.id];

  // Register in array
  collisionObjects.splice(0, collisionObjects.length);
  collisionObjects.push(...Object.values(collisionObjectsMap));
};
const unregisterAsCollisionObject = (objectId) => {
  delete collisionObjectsMap[objectId];
};

let lastFrameTime = new Date().getTime();
let frameDuration = null;
let getFrameDuration = () => frameDuration;

const update = () => {
  if (!getIsStopped()) {
    const thisFrameTime = new Date().getTime();
    frameDuration = thisFrameTime - lastFrameTime;
    lastFrameTime = thisFrameTime;

    if (getNextCollisionTime() <= new Date().getTime()) {
      // A collision happpened
      const isFirstCollision = getNextCollisionTime() > 0;

      if (isFirstCollision) {
        // stopSim();
      }

      // Set new vectors
      for (const pair of getNextCollisionPairs()) {
        handleObjectCollisions(
          collisionObjectsMap[pair[0]],
          collisionObjectsMap[pair[1]]
        );
      }

      // Calculate next collisions
      const { time: nextCollisionTime, pairs: nextCollisionPairs } =
        getNextCollisions();
      setNextCollisionTime(nextCollisionTime);
      setNextCollisionPairs(nextCollisionPairs);
    }
    for (const object of objects) object.update();
  } else lastFrameTime = new Date().getTime();

  requestAnimationFrame(update);
};

const startSimulation = () => update();

module.exports = {
  worldConfig,
  registerObjects,
  unregisterObject,
  registerCollisionObjects,
  unregisterAsCollisionObject,
  moveObj,
  startSimulation,

  getFrameDuration,
  setContainer,
};
