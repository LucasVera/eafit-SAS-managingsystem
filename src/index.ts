import http from 'http';
import express from 'express';
import config from './config';
import AdaptationContext from './services/AdaptationContext';
import { Controllers } from './enums';
import { updateCurrentState, sendTemperatureSetpoint } from './services/TemperatureService';

let app = express();
const server = http.createServer(app);

const adaptationContext = new AdaptationContext();
// Start as the on-off controller
adaptationContext.setCurrentController(Controllers.ON_OFF);

// Manually set the new endpoints
app.post('/new-setpoints', (req, res) => {
  const { temperature } = req.body;
  if (temperature) {
    sendTemperatureSetpoint(temperature, adaptationContext);
  }
});

const port = process.env.PORT || config.Port || 8080;

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

setInterval(() => {
  // This function runs every x minutes, set in the config file.
  // Here, the managing system asses the adaptation and can change
  // the controller based on the remaining battery level
  // TODO: Adapt based off humidity and level of water tank
  // TODO: Send data to a dashboard or through email (adaptation)
  updateCurrentState(adaptationContext);
  adaptationContext.updateEnvironmentVariables();
  const { currentBatteryLevel } = adaptationContext;
  if (currentBatteryLevel < 25) {
    adaptationContext.setCurrentController(Controllers.ON_OFF);
  }
  else {
    adaptationContext.setCurrentController(Controllers.PID);
  }

}, config.AdaptationTimerMinutes * 60 * 1000);

export default { app, server };
