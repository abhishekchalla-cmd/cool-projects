const { SETUP_TYPE } = require("../utils/enums");

// All setups
const phone_setup = require("./phone");

const createSetup = (setupConfig, container) => {
  const setups = {
    [SETUP_TYPE.phone]: phone_setup.setup,
  };

  return setups[setupConfig.type](setupConfig, container);
};

module.exports = { createSetup };
