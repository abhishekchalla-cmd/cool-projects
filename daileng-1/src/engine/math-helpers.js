// Have two objects collided
const haveCollided = (objA, objB) =>
  Math.pow(objA.x - objB.x, 2) + Math.pow(objA.y - objB.y, 2) <
  Math.pow(objA.radius + objB.radius, 2);

// Calculate vectors of two objects after collision
const getNewVectorsOnCollision = (objA, objB) => {
  const vA = objA.velocity,
    vB = objB.velocity;
  const AB = [objA.x - objB.x, objA.y - objB.y];

  const mag_vA = Math.sqrt(Math.pow(vA[1], 2) + Math.pow(vA[0], 2)),
    mag_vB = Math.sqrt(Math.pow(vB[1], 2) + Math.pow(vB[0], 2)),
    mag_AB = Math.sqrt(Math.pow(AB[1], 2) + Math.pow(AB[0], 2));

  const slopeA = vA[1] / vA[0],
    slopeB = vB[1] / vB[0],
    slopeAB = AB[1] / AB[0];
  const angleA = Math.atan(slopeA) - Math.atan(slopeAB);
  const angleB = Math.atan(slopeB) - Math.atan(slopeAB);

  const cosA = Math.cos(angleA),
    cosB = Math.cos(angleB);

  const vAB = [
    ((mag_vA * cosA) / mag_AB) * AB[0],
    ((mag_vA * cosA) / mag_AB) * AB[1],
  ];
  const vBA = [
    ((mag_vB * cosB) / mag_AB) * AB[0],
    ((mag_vB * cosB) / mag_AB) * AB[1],
  ];

  const newVectors = [
    { velocity: [vA[0] - vBA[0], vA[1] - vBA[1]] },
    { velocity: [vB[0] - vAB[0], vB[1] - vAB[1]] },
  ];

  return newVectors;
};

const getCollisionTimeSquared = (objA, objB) => {
  return (
    Math.pow(objA.radius + objB.radius, 2) /
    (Math.pow(objA.velocity[1] - objB.velocity[1], 2) +
      Math.pow(objA.velocity[0] - objB.velocity[0], 2))
  );
};

module.exports = {
  haveCollided,
  getNewVectorsOnCollision,
  getCollisionTimeSquared,
};
