const Circle = require("../engine/objects/circle");

class DomCircle extends Circle {
  element;

  constructor(...args) {
    super(...args);

    this.createDOMElement();
  }

  update() {
    super.update();

    const { element } = this;
    element.style.top = this.y + "px";
    element.style.left = this.x + "px";
  }

  createDOMElement() {
    const div = document.createElement("div");
    div.setAttribute("id", this.id);
    div.classList.add("circle");
    div.style.width = 2 * this.radius + "px";
    div.style.height = 2 * this.radius + "px";
    this.element = div;
  }
}

module.exports = DomCircle;
