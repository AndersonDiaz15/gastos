import { defineConfig } from "cypress";

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report", // Carpeta donde se guardarán los reportes
    overwrite: false,
    html: false, // Genera JSON (lo convertiremos luego a HTML)
    json: true,
  },
  e2e: {
    baseUrl: "https://pagina-prueba-gastos-12345.netlify.app/",
  },
});
