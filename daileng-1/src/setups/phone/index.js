const { startCollisions } = require("../../hooks/mousemove");
const { reset } = require("../../hooks/reset");
const { generateLayout } = require("./layout");

const setup = (setupConfig, container) => {
  // Generate all the objects and arrange them in a layout
  const { circles, resetButton } = generateLayout(
    setupConfig.layout,
    container
  );

  /*
    Add the mouse over trigger for:
      - The initial object to snap to cursor
      - Begin collision processing
  */
  const circleMouseOverFunction = (e) => {
    const circleId = e.currentTarget.getAttribute("id");
    const circle = circles.find((e) => e.id === circleId);
    circles.forEach((circle) =>
      circle.element.removeEventListener("mouseover", circleMouseOverFunction)
    );
    startCollisions(circle);
  };

  // Insert circles to DOM
  for (const circle of circles) {
    const { element } = circle;
    // element.addEventListener("mouseover", circleMouseOverFunction);
    container.element.appendChild(element);
  }

  circles[0].velocity = [100, -100];
  // circles[2].velocity = [-50, 50];

  // Insert reset button to DOM
  resetButton.element.addEventListener("click", () =>
    reset({ circles, resetButton })
  );
  container.element.appendChild(resetButton.element);

  return {
    collisionObjects: circles,
    staticObjects: [resetButton],
  };
};

module.exports = { setup };
