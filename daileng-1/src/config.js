const { SETUP_TYPE } = require("./utils/enums");

module.exports = {
  world: {
    frictionCoeffecient: 0,
  },
  setup: {
    type: SETUP_TYPE.phone,
    layout: {
      circleRadius: 50,
      rows: 3,
      columns: 3,
      spacing: 5,
    },
  },
};
