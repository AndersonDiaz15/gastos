const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://pagina-prueba-gastos-12345.netlify.app/",
    setupNodeEvents(on, config) {
      // Eventos si necesitas en un futuro
    },
  },
});
