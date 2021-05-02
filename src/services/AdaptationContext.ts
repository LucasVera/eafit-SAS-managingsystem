import { Controllers } from "../enums";
import config from '../config';
import { getBatteryLevel, getWaterTankLevel } from "./ContextService";

const {
  OnOffController: {
    Address: onOffControllerAddress,
  },
  PIDController: {
    Address: pidControllerAddress,
  },
} = config;

export default class AdaptationContext {
  private currentController: string = Controllers.ON_OFF;

  public currentTemperature = 0;
  public currentHumidity = 0;

  public currentWaterTankLevel = 0;
  public currentBatteryLevel = 0;

  constructor() {}

  getCurrentController() {
    return this.currentController;
  }
  setCurrentController(controller: string) {
    this.currentController = controller;
  }
  getControllerUrl(onOffEndpoint: string, pidEndpoint: string) {
    let url = '';
    if (this.currentController === Controllers.ON_OFF) {
      url = `http://${onOffControllerAddress}/${onOffEndpoint}`;
    }
    else if (this.currentController === Controllers.PID) {
      url = `http://${pidControllerAddress}/${pidEndpoint}`;
    }

    return url;
  }

  updateEnvironmentVariables() {
    this.currentWaterTankLevel = getWaterTankLevel();
    this.currentBatteryLevel = getBatteryLevel();
  }

  getContextJsonString() {
    return JSON.stringify({
      controller: this.currentController,
      temperature: this.currentTemperature,
      humidity: this.currentHumidity,
      waterTankLevel: this.currentWaterTankLevel,
      batteryLevel: this.currentBatteryLevel,
    });
  }
}
