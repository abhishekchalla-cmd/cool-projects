const config = require("../config");
const {
  objects,
  objectsMap,
  collisionObjects,
  collisionObjectsMap,
  getCollisionTime,
  setCollisionTime,
} = require("./vars");
const {
  hasCollided,
  handleObjectCollisions,
  getNextCollisionTime,
} = require("./collision");

const worldConfig = {
  frictionCoefficient: 0,
  ...config.world,
};

const moveObj = (object) => {
  // Check collisions for cursor circle
  if (hasCollided(object)) {
    handleObjectCollisions(object);
    getNextCollisionTime();
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
  const thisFrameTime = new Date().getTime();
  frameDuration = thisFrameTime - lastFrameTime;
  lastFrameTime = thisFrameTime;

  // Check collisions for every object
  for (const object of objects) object.update();
  if (getCollisionTime() < new Date().getTime()) {
    setCollisionTime(getNextCollisionTime());
    console.log(getCollisionTime());
  }
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
};
