import axios from "axios";
import config from "../config";
import AdaptationContext from "./AdaptationContext";

const { DashboardUrl } = config;

export const sendContextToDashboard = (context: AdaptationContext) => {
  // TODO: Implement this to send info to a dashboard
  console.log('Sending current state to dashboard');

  axios.post(DashboardUrl, context.getContextJsonString());
}
