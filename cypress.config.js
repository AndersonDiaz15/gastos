const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://paginas-pruebas.lovestoblog.com/",
    setupNodeEvents(on, config) {
      // Eventos si necesitas en un futuro
    },
  },
});
