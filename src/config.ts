export default {
  Port: 8080,
  AdaptationTimerMinutes: 10,
  DashboardUrl: 'http://localhost:9090',
  OnOffController: {
    Address: '192.168.1.10',
    SetTemperatureEndpoint: '/t-setpoint/',
    SetHumidityEndpoint: '/h-setpoint/',
    GetCurrentStateEndpoint: '/get-state'
  },
  PIDController: {
    Address: '192.168.1.11',
    SetTemperatureEndpoint: '/t-setpoint/',
    SetHumidityEndpoint: '/h-setpoint/',
    GetCurrentStateEndpoint: '/get-state'
  }
}
