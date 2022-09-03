const DomCircle = require("../../elements/Circle");

// Phone layout generator
const generateLayout = (
  { rows, columns, spacing, circleRadius },
  container
) => {
  const leftOffset =
    (container.width - columns * 2 * circleRadius - (columns - 1) * spacing) /
    2;
  const topOffset =
    (container.height - (rows + 1) * 2 * circleRadius - rows * spacing) / 2;

  const circles = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const circle = new DomCircle({ radius: circleRadius });
      circle.x = leftOffset + j * (2 * circleRadius + spacing);
      circle.y = topOffset + i * (2 * circleRadius + spacing);
      circles.push(circle);
    }
  }

  const resetButton = new DomCircle({ radius: circleRadius });
  Object.assign(resetButton, {
    x: (container.width - 2 * circleRadius) / 2,
    y: topOffset + rows * (2 * circleRadius + spacing),
  });
  resetButton.element.classList.add("green");

  return { circles, resetButton };
};

module.exports = { generateLayout };
