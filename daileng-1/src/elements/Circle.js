const Circle = require("../engine/objects/circle");
const { rootDiv } = require("../utils/dom");

class DomCircle extends Circle {
  initialCoords;
  element;

  constructor(...args) {
    super(...args);
    this.initialCoords = [args[0].x, args[0].y];
    this.x = args[0].x;
    this.y = args[0].y;

    this.createDOMElement();
  }

  update() {
    super.update();

    const { element } = this;
    element.style.top = rootDiv.clientHeight - this.y + "px";
    element.style.left = this.x + "px";
  }

  createDOMElement() {
    const div = document.createElement("div");
    div.setAttribute("id", this.id);
    div.classList.add("circle");
    div.innerHTML = this.id + "";
    div.style.width = 2 * this.radius + "px";
    div.style.height = 2 * this.radius + "px";
    this.element = div;
  }
}

module.exports = DomCircle;
