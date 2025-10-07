import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer.js";

module.exports = defineConfig({
  reporter: "mocha-allure-reporter",
  reporterOptions: {
    resultsDir: "allure-results", // carpeta donde se guardan los resultados
  },
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: "https://pagina-prueba-gastos-12345.netlify.app/",
  },
});
