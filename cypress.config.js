const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api.openweathermap.org',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false, 
  screenshotOnRunFailure: true,
  env: {
    api_server: 'https://api.openweathermap.org/data/2.5',
    apiKey: '', // indique su Key https://home.openweathermap.org/api_keys
  },
});
