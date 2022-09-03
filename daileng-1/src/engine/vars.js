const objects = [];
const objectsMap = {};

const collisionObjects = [];
const collisionObjectsMap = {};

const collisionPoints = {};

let collisionTime = 0;
const setCollisionTime = (v) => {
  collisionTime = v;
};
const getCollisionTime = () => collisionTime;

module.exports = {
  objects,
  objectsMap,
  collisionObjects,
  collisionObjectsMap,

  collisionPoints,
  collisionTime,
  getCollisionTime,
  setCollisionTime,
};
