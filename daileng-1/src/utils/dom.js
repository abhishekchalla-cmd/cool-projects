let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

window.addEventListener("resize", () => {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
});

const rootDiv = document.getElementById("root");

module.exports = {
  windowHeight,
  windowWidth,
  rootDiv,
};
