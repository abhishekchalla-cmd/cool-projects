const DomCircle = require("../../elements/Circle");

// Phone layout generator
const generateLayout = (
  { rows, columns, spacing, circleRadius },
  container
) => {
  const leftOffset =
    (container.width - columns * 2 * circleRadius - (columns - 1) * spacing) /
    2;
  const bottomOffset =
    (container.height - (rows + 1) * 2 * circleRadius - rows * spacing) / 2;

  const circles = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const x = leftOffset + j * (2 * circleRadius + spacing);
      const y = bottomOffset + (rows + 1 - i) * (2 * circleRadius + spacing);
      const circle = new DomCircle({ radius: circleRadius, x, y });
      circles.push(circle);
    }
  }

  const resetButton = new DomCircle({
    radius: circleRadius,
    x: (container.width - 2 * circleRadius) / 2,
    y: bottomOffset + 2 * circleRadius,
  });
  resetButton.element.classList.add("green");

  return { circles, resetButton };
};

module.exports = { generateLayout };
