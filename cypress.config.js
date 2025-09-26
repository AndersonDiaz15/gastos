const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Eventos si necesitas en un futuro
    },
    baseUrl: "https://pagina-prueba-gastos-12345.netlify.app/",
    //video: true,
  },
});
