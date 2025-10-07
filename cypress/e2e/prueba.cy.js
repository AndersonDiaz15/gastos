describe("Pruebas de la página de gastos", () => {
  it("Carga la página correctamente", () => {
    cy.visit("/");
    cy.get("p").contains("Has gastado"); // Verifica el texto inicial
  });

  it("Muestra el formulario al hacer click en la imagen añadir", () => {
    cy.visit("/");
    cy.get("#añadir").click();
    cy.get("#formulario").should("be.visible");
  });

  it("Agrega un gasto y actualiza el total", () => {
    cy.visit("/");

    // Abrir formulario
    cy.get("#añadir").click();

    // Llenar inputs
    cy.get('input[name="descripcion"]').type("Cafe tostao");
    cy.get('input[name="precio"]').type("5000");

    // Click en agregar
    cy.get("#agregarGasto").click();

    // Verifica que el total se actualizó
    cy.get("h2").first().should("contain", "500");

    // Verifica que aparece la caja con el gasto
    cy.get(".caja").should("exist").and("be.visible");
    cy.get(".caja p").should("contain", "Cafe tostao");
    cy.get(".caja h2").should("contain", "5000");
  });
});
