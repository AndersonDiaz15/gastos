const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Eventos si necesitas en un futuro
    },
    baseUrl: "http://paginas-pruebas.lovestoblog.com/",
    video: true,
  },
});
