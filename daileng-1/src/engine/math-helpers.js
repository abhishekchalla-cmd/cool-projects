// Have two objects collided
const haveCollided = (objA, objB) =>
  Math.pow(objA.x - objB.x, 2) + Math.pow(objA.y - objB.y, 2) <
  Math.pow(objA.radius + objB.radius, 2);

// Calculate vectors of two objects after collision
const getNewVectorsOnCollision = (objA, objB) => {
  console.log("\n\n\n");
  console.log("Objects colliding", objA.id, objB.id);
  const vA = objA.velocity,
    vB = objB.velocity;
  const AB = [objA.x - objB.x, objA.y - objB.y];

  const mag_vA = Math.sqrt(Math.pow(vA[1], 2) + Math.pow(vA[0], 2)),
    mag_vB = Math.sqrt(Math.pow(vB[1], 2) + Math.pow(vB[0], 2)),
    mag_AB = objA.radius + objB.radius;

  console.log("AB", AB);

  const slopeAB = AB[1] / AB[0];

  let vAB = [0, 0],
    vBA = [0, 0];

  if (mag_vA > 0) {
    const slopeA = vA[1] / vA[0];
    const angleA = Math.atan(slopeA) - Math.atan(slopeAB);

    const cosA = Math.abs(Math.cos(angleA));
    vAB = [
      -((mag_vA * cosA) / mag_AB) * AB[0],
      -((mag_vA * cosA) / mag_AB) * AB[1],
    ];
    console.log("Object A to Object B force", vAB);
  }

  if (mag_vB > 0) {
    const slopeB = vB[1] / vB[0];
    const angleB = Math.atan(slopeB) - Math.atan(slopeAB);
    const cosB = Math.cos(angleB);
    vBA = [
      ((mag_vB * cosB) / mag_AB) * AB[0],
      ((mag_vB * cosB) / mag_AB) * AB[1],
    ];
    console.log("Object B to Object A force", vBA);
  }

  const newVectors = [
    { id: objA.id, velocity: [vA[0] + vBA[0], vA[1] + vBA[1]] },
    { id: objB.id, velocity: [vB[0] + vAB[0], vB[1] + vAB[1]] },
  ];

  return newVectors;
};

const getCollisionTime = (objA, objB) => {
  /*
    Math:
      For object A
      xA = objA.x + vAx * t;
      yA = objA.y + vAy * t;

      For object B
      xB = objB.x + vBx * t;
      yB = objB.y + vBy * t;

      distance between their centers:
      d^2 = (yB - yA)^2 + (xB - xA)^2
      d^2 = (objB.y + vBy * t - objA.y + vAy * t)^2 + (objB.x + vBx * t - objA.x + vAx * t)^2;
      Here,
        y0 = objB.y - objA.y
        x0 = objB.x - objA.x
      Therefore,
      d^2 = (y0 + vBy*t - vAy*t)^2 + (x0 + vBx*t - vAx*t)^2;
      d^2 = (y0^2 + vBy^2*t^2 + vAy^2*t^2 + 2*y0*vBy*t - 2*y0*vAy*t - 2*vAy*vBy*t^2) + (x0^2 + vBx^2*t^2 + vAx^2*t^2 + 2*x0*vBx*t - 2*x0*vAx*t - 2*vAx*vBx*t^2)
      d^2 = (vBy^2*t^2 + vAy^2*t^2 - 2*vAy*vBy*t^2) + (vBx^2*t^2 + vAx^2*t^2 - 2*vAx*vBx*t^2) + (2*y0*vBy*t - 2*y0*vAy*t + 2*x0*vBx*t - 2*x0*vAx*t) + (y0^2 + x0^2)
      d^2 = t^2*((vBy - vAy)^2 + (vBx - vAx)^2) + t*2*(y0*(vBy - vAy) + x0*(vBx - vAx)) + (y0^2 + x0^2)
      0 = t^2*((vBy - vAy)^2 + (vBx - vAx)^2) + t*2*(y0*(vBy - vAy) + x0*(vBx - vAx)) + (y0^2 + x0^2 - d^2)

      Therefore,
      a = (vBy - vAy)^2 + (vBx - vAx)^2
      b = 2*(y0*(vBy - vAy) + x0*(vBx - vAx))
      c = y0^2 + x0^2 + d^2

      t = (-b + Math.sqrt(b - 4*a*c)) / (2 * a)
      t = (-b - Math.sqrt(b - 4*a*c)) / (2 * a)
  */

  const y0 = objB.y - objA.y,
    x0 = objB.x - objA.x,
    d = objA.radius + objB.radius;
  const a =
    Math.pow(objB.velocity[1] - objA.velocity[1], 2) +
    Math.pow(objB.velocity[0] - objA.velocity[0], 2);
  const b =
    2 *
    (y0 * objB.velocity[1] -
      y0 * objA.velocity[1] +
      x0 * objB.velocity[0] -
      x0 * objA.velocity[0]);
  const c = y0 * y0 + x0 * x0 - d * d;

  // const sol1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const sol2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);

  // Possible values for solutions: Infinity, NaN, 0, -ve, +ve
  // Acceptable value: +ve

  return sol2 > 0 ? Math.round(sol2) : Infinity;
};

module.exports = {
  haveCollided,
  getNewVectorsOnCollision,
  getCollisionTime,
};
