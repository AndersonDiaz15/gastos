import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer.js";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: "https://pagina-prueba-gastos-12345.netlify.app/",
  },
});
