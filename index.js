const formulario = document.getElementById("formulario");
const añadir = document.getElementById("añadir");
const cancelar = document.getElementById("cancelar");
const historial = document.getElementById("historial");

const descripcionInput = formulario.querySelector('[name="descripcion"]');
const precioInput = formulario.querySelector('[name="precio"]');
const descripcionError = document.getElementById('descripcion-error');
const precioError = document.getElementById('precio-error');

let totalGastos = 0;

añadir.addEventListener("click", () => {
  limpiarFormulario();
  formulario.style.display = "flex"; // Mostrar el formulario al hacer clic en "Añadir"

  añadir.style.display = "none"; // Ocultar el botón "Añadir"
  cancelar.style.display = "inline"; // Mostrar el botón "Cancelar"
});

function limpiarFormulario() {
  formulario.querySelector('[name="descripcion"]').value = "";
  formulario.querySelector('[name="precio"]').value = "";
}


cancelar.addEventListener("click", () => {
  
  
  formulario.style.display = "none"; // Ocultar el formulario al hacer clic en "Cancelar"
  añadir.style.display = "inline"; // Mostrar nuevamente el botón "Añadir"
  cancelar.style.display = "none"; // Ocultar el botón "Cancelar"
  limpiarFormulario();
});



function restarPrecioEliminado(precio) {
  // Verificar si el precio eliminado es igual al total actual,
  // en ese caso, establecer el total a 0
  if (totalGastos === precio) {
    totalGastos = 0;
  } else {
    totalGastos -= parseFloat(precio);
  }

  // Actualizar el contenido del elemento <h2> en el header
  const totalHeader = document.querySelector("header h2");
  totalHeader.textContent = `total: COL$ ${totalGastos.toFixed(2)}`;
}
const botonAgregarGasto = formulario.querySelector("button");
botonAgregarGasto.addEventListener("click", agregarEditarGasto);

function agregarEditarGasto(event) {
  event.preventDefault();

  const descripcion = formulario.querySelector('[name="descripcion"]').value;
  const precio = formulario.querySelector('[name="precio"]').value;

  if (!validarDescripcion(descripcion)) {
    descripcionError.textContent = "La descripción debe tener entre 4 y 30 caracteres y solo puede contener letras, números y guiones.";
    descripcionInput.classList.add('error');
    return;
  } else {
    descripcionError.textContent = "";
    descripcionInput.classList.remove('error');
  }

  if (!validarPrecio(precio)) {
    precioError.textContent = "El precio debe ser un número válido.";
    precioInput.classList.add('error');
    return;
  } else {
    precioError.textContent = "";
    precioInput.classList.remove('error');
  }

  if (botonAgregarGasto.textContent === "Agregar Gasto") {
    agregarGasto(descripcion, precio);
  } else {
    editarGasto(descripcion, precio);
  }

  formulario.style.display = "none";
  añadir.style.display = "inline";
  cancelar.style.display = "none";
  limpiarFormulario();
}




function validarDescripcion(descripcion) {
  const descripcionRegex = /^[A-Za-z0-9\s-]{4,30}$/;
  return descripcionRegex.test(descripcion);
}

function validarPrecio(precio) {
  return !isNaN(parseFloat(precio)) && isFinite(precio);
}


function agregarGasto(descripcion, precio) {
  const nuevaCaja = document.createElement("div");
  nuevaCaja.classList.add("caja");
  nuevaCaja.innerHTML = `
    <div class="container">
      <p>${descripcion}</p>
      <h2>COL$ ${precio}</h2>
    </div>
    <p class="fecha">${getFechaLocalizada()}</p>
    <div class="items">
      <img class="editar" src="./Imagenes/icons8-crear-nuevo-26.png" alt="">
      <img class="eliminar" src="./Imagenes/icons8-eliminar-26.png" alt="">
    </div>
  `;
  nuevaCaja.style.display = "flex";

  // Agregar la nueva caja al contenedor "historial"
  historial.appendChild(nuevaCaja);

  totalGastos += parseFloat(precio);

  // Actualizar el contenido del elemento <h2> en el header
  const totalHeader = document.querySelector("header h2");
  totalHeader.textContent = `total: COL$  ${totalGastos.toFixed(2)}`;
}

function editarGasto(descripcion, precio) {
  const cajaEditar = document.querySelector(".caja.editar");
  const precioAnterior = parseFloat(cajaEditar.querySelector(".container h2").innerText.slice(5));
  cajaEditar.querySelector(".container p").innerText = descripcion;
  cajaEditar.querySelector(".container h2").innerText = `COL$ ${precio}`;
  botonAgregarGasto.textContent = "Agregar Gasto";
  cajaEditar.classList.remove("editar");

  // Restar el precio original de la caja al total y sumar el nuevo precio
  totalGastos = totalGastos - precioAnterior + parseFloat(precio);

  // Actualizar el contenido del elemento <h2> en el header
  const totalHeader = document.querySelector("header h2");
  totalHeader.textContent = `total: COL$ ${totalGastos.toFixed(2)}`;
}



//  editar o eliminar al hacer clic en la imagen con clase "editar" o "eliminar"
historial.addEventListener("click", (event) => {
  const target = event.target;
  const caja = target.closest(".caja");

  if (caja) {
    if (target.classList.contains("editar")) {
      const descripcion = caja.querySelector(".container p").innerText;
      const precio = caja.querySelector(".container h2").innerText;
      formulario.style.display = "flex";
      formulario.querySelector('[name="descripcion"]').value = descripcion;
      formulario.querySelector('[name="precio"]').value = precio;
      botonAgregarGasto.textContent = "Guardar Cambios";
      caja.classList.add("editar");
      añadir.style.display = "none";
      cancelar.style.display = "inline";
    } else if (target.classList.contains("eliminar")) {
      const precioEliminado = parseFloat(caja.querySelector(".container h2").innerText.slice(5));
      restarPrecioEliminado(precioEliminado); // Llamar a la función restarPrecioEliminado
      caja.remove(); // Eliminar la caja del DOM
      
    }
  }
});

// Evento del contenedor "historial" para mostrar los ítems al pasar el ratón en escritorio
//isTouchDevice() se utiliza para detectar si el dispositivo es táctil 
historial.addEventListener("mouseover", (event) => {
  if (!isTouchDevice()) {
    const items = event.target.querySelector(".items");
    if (items) {
      items.style.display = "flex";
    }
  }
});

historial.addEventListener("mouseout", (event) => {
  if (!isTouchDevice()) {
    const items = event.target.querySelector(".items");
    if (items) {
      items.style.display = "none";
    }
  }
});

// Evento del contenedor "historial" para mostrar los ítems al tocar en dispositivos táctiles
historial.addEventListener("touchend", (event) => {
  if (isTouchDevice()) {
    const items = event.target.querySelector(".items");
    if (items) {
      items.style.display = "flex";
    }
  }
});

// Función para detectar si el dispositivo es táctil
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function getFechaLocalizada() {
  const fechaActual = new Date();
  const opcionesFecha = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return fechaActual.toLocaleDateString("es-ES", opcionesFecha);
}









