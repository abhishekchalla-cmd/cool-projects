let container;
const getContainer = () => container;
const setContainer = (e) => (container = e);

const objects = [];
const objectsMap = {};

const collisionObjects = [];
const collisionObjectsMap = {};

let nextCollisionPairs = [],
  nextCollisionTime = 0;
const setNextCollisionTime = (t) => (nextCollisionTime = t);
const setNextCollisionPairs = (p) => {
  nextCollisionPairs.splice(0, nextCollisionPairs.length);
  nextCollisionPairs.push(...p);
};
const getNextCollisionTime = () => nextCollisionTime;
const getNextCollisionPairs = () => nextCollisionPairs;

module.exports = {
  getContainer,
  setContainer,

  objects,
  objectsMap,
  collisionObjects,
  collisionObjectsMap,

  nextCollisionPairs,
  nextCollisionTime,
  setNextCollisionTime,
  setNextCollisionPairs,
  getNextCollisionTime,
  getNextCollisionPairs,
};
