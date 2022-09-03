const { worldConfig, getFrameDuration } = require("..");
const { newId } = require("../../elements");
const { throw_error } = require("../../utils/error");

class Circle {
  id = newId();
  name = "";
  ignorePhysics = false;

  x = null;
  y = null;
  radius = null;
  velocity = [0, 0]; // In pixels / second
  acceleration = [0, 0];

  constructor(props) {
    this.radius = props.radius;
    return this;
  }

  applyForce(forceVector) {
    this.velocity[0] += forceVector[0];
    this.velocity[1] += forceVector[1];
  }

  update() {
    if (this.x !== null && this.y !== null) {
      if (!this.ignorePhysics) {
        this.velocity = this.velocity.map(
          (n) => n * (1 - worldConfig.frictionCoefficient)
        );

        this.x += this.velocity[0] * (getFrameDuration() / 1000);
        this.y += this.velocity[1] * (getFrameDuration() / 1000);
      }
    } else
      throw_error(
        `x-y coordinates haven't been set properly for object: ${
          this.name || "unnamed"
        } (#${this.id})`
      );
  }
}

module.exports = Circle;
