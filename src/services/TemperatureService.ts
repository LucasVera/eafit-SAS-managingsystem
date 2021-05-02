import axios from "axios";
import config from "../config";
import { Controllers } from "../enums";
import AdaptationContext from './AdaptationContext';

const {
  OnOffController: {
    SetTemperatureEndpoint: onOffSetEndpoint,
    GetCurrentStateEndpoint: onOffGetEndpoint,
  },
  PIDController: {
    SetTemperatureEndpoint: pidSetEndpoint,
    GetCurrentStateEndpoint: pidGetEndpoint,
  },
} = config;

export const sendTemperatureSetpoint = (setpoint: number, adaptationContext: AdaptationContext) => {
  let url = adaptationContext.getControllerUrl(onOffSetEndpoint, pidSetEndpoint);
  url += `/${setpoint}`;

  axios.post(url, {}).then(response => {
    const { status } = response;
    if (status === 200) {
      console.log('Temperature setpoint successfully sent to managed system');
    }
  }).catch(ex => {
    console.error('Error getting state.', ex);
  });
}

export const updateCurrentState = (adaptationContext: AdaptationContext) => {
  let url = adaptationContext.getControllerUrl(onOffGetEndpoint, pidGetEndpoint);
  axios.get(url, {}).then(response => {
    const { data } = response;
    adaptationContext.currentHumidity = data.humidity;
    adaptationContext.currentTemperature = data.temperature;
  }).catch(ex => {
    console.error('Error getting state.', ex);
  });
}
