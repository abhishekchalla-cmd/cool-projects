let isStopped = false;

const getIsStopped = () => isStopped;
const stopSim = () => (isStopped = true);
const resumeSim = () => (isStopped = false);
window.stopSim = stopSim;
window.resumeSim = resumeSim;

module.exports = {
  isStopped,
  getIsStopped,
  stopSim,
  resumeSim,
};
