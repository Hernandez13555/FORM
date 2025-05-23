import { esValido } from "./modulo.js";
//Variables
const formulario = document.querySelector("form");
const nombre = document.querySelector("[name=nombre]");
const apellido = document.querySelector("[name=apellido]");
const telefono = document.querySelector("[name=telefono]");
const documento = document.querySelector("[name=documento]");
const usuario = document.querySelector("[name=usuario]");
const contrasena = document.querySelector("[name=contrasena]");
const politicas = document.querySelector("[name=politicas]");
const boton = document.querySelector("#btn_validar");

//Funciones
const validar = (event) => {
  const valores = [nombre, apellido, telefono, documento, usuario, contrasena];
  const valoresString = [
    "nombre",
    "apellido",
    "telefono",
    "documento",
    "usuario",
    "contraseña",
  ];
  event.preventDefault();
  let cont = 0;
  let focus = 0;
  let mensaje = "Ingrese correctamente: ";
  for (let x = 0; x < valores.length; x++) {
    if (valores[x].value.trim() === "") {
      if (valores[x].nextElementSibling) valores[x].nextElementSibling.remove();
      if (cont > 0) {
        mensaje += ", " + valoresString[x];
      } else {
        mensaje += " " + valoresString[x];
        cont++;
      }
      valores[x].style.border = "2px solid red";
      if (focus == 0) {
        valores[x].focus();
        focus++;
      }
      let aviso = document.createElement("span");
      aviso.classList.add("avisoError");
      aviso.textContent = `El campo ${valoresString[x]} es Obligatorio`;
      valores[x].insertAdjacentElement("afterend", aviso);
    }
    // else formulario.addEventListener("submit", esValido);
  }
  if (mensaje != "Ingrese correctamente: ") alert(mensaje);
};
const letras = (event) => {
  const regexp = /^[a-zA-Z]$/;
  if (
    !regexp.test(event.key) &&
    event.key !== "Backspace" &&
    event.key !== "Tab"
  ) {
    event.preventDefault();
  }
  if (event.target.value.length >= 10) {
    event.preventDefault();
  }
};
const numeros = (event) => {
  if (
    !/^\d$/.test(event.key) &&
    event.key !== "Backspace" &&
    event.key !== "Tab"
  ) {
    event.preventDefault();
  }
  if (event.target.value.length >= 10) {
    event.preventDefault();
  }
};
const limpiar = (event) => {
  if (event.target.value !== "") {
    event.target.classList.remove("error");
    event.target.style.border = "0px";
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.remove();
    }
  }
};
const acepta = () => {
  if (!politicas.checked) {
    boton.setAttribute("disabled", "");
  } else {
    boton.removeAttribute("disabled");
  }
};
const isValid = (e) => {
  let data = esValido(e);
  console.log(data);
};

//Tabla
const posts = async () => {
  const request = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await request.json();
  return posts;
};

const usuarios = async () => {
  const request = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await request.json();
  return usuarios;
};

const tabla = (posts, usuarios) => {
  const root = document.querySelector("#app");
  const tabla = document.createElement("table");
  const header = document.createElement("thead");

  // Crear encabezados
  const thId = document.createElement("th");
  const thNombre = document.createElement("th");
  const thApellido = document.createElement("th");
  const thDocumento = document.createElement("th");
  const thTelefono = document.createElement("th");
  const thUsuario = document.createElement("th");
  const thContrasena = document.createElement("th");
  const thCiudad = document.createElement("th");
  const thLenguaje = document.createElement("th");
  const thGenero = document.createElement("th");
  const thAcciones = document.createElement("th");

  const tbody = document.createElement("tbody");
  const fragmento = document.createDocumentFragment();

  usuarios.forEach(
    ({
      id,
      nombre,
      apellido,
      documento,
      telefono,
      name,
      contrasena,
      ciudad,
      lenguaje,
      genero,
    }) => {
      const tr = document.createElement("tr");

      // Crear celdas
      const tdId = document.createElement("td");
      const tdNombre = document.createElement("td");
      const tdApellido = document.createElement("td");
      const tdDocumento = document.createElement("td");
      const tdTelefono = document.createElement("td");
      const tdUsuario = document.createElement("td");
      const tdContrasena = document.createElement("td");
      const tdCiudad = document.createElement("td");
      const tdLenguaje = document.createElement("td");
      const tdGenero = document.createElement("td");
      const tdAcciones = document.createElement("td");

      // Botones
      const btnEditar = document.createElement("button");
      const btnEliminar = document.createElement("button");

      // Asignar valores
      tr.setAttribute("id", `post_${id}`);
      btnEditar.setAttribute("data-id", id);
      btnEliminar.setAttribute("data-id", id);
      btnEditar.textContent = "Editar";
      btnEliminar.textContent = "Eliminar";
      btnEditar.classList.add("editar");
      btnEliminar.classList.add("eliminar");

      tdId.textContent = id;
      tdNombre.textContent = nombre;
      tdApellido.textContent = apellido;
      tdDocumento.textContent = documento;
      tdTelefono.textContent = telefono;
      tdUsuario.textContent = name;
      tdContrasena.textContent = contrasena;
      tdCiudad.textContent = ciudad;
      tdLenguaje.textContent = lenguaje;
      tdGenero.textContent = genero;
      tdAcciones.append(btnEditar, btnEliminar);

      // Agregar celdas a la fila en el orden deseado
      tr.append(
        tdId,
        tdNombre,
        tdApellido,
        tdDocumento,
        tdTelefono,
        tdUsuario,
        tdContrasena,
        tdCiudad,
        tdLenguaje,
        tdGenero,
        tdAcciones
      );
      fragmento.append(tr);
    }
  );

  tbody.append(fragmento);

  // Encabezados en el orden deseado
  thId.textContent = "ID";
  thNombre.textContent = "Nombre";
  thApellido.textContent = "Apellido";
  thDocumento.textContent = "Documento";
  thTelefono.textContent = "Teléfono";
  thUsuario.textContent = "Usuario";
  thContrasena.textContent = "Contraseña";
  thCiudad.textContent = "Ciudad";
  thLenguaje.textContent = "Lenguajes";
  thGenero.textContent = "Género";
  thAcciones.textContent = "Acciones";

  // Agregar encabezados a la tabla
  header.append(
    thId,
    thNombre,
    thApellido,
    thDocumento,
    thTelefono,
    thUsuario,
    thContrasena,
    thCiudad,
    thLenguaje,
    thGenero,
    thAcciones
  );
  tabla.append(header, tbody);
  root.append(tabla);
};


const data = Promise.all([posts(), usuarios()]).then(([posts, usuarios]) => {
  tabla(posts, usuarios);
});

// Manejo de botones
window.addEventListener("click", (e) => {
  if (e.target.matches(".editar")) {
    let id = e.target.dataset.id;
    alert(`Editar usuario con ID: ${id}`);
  }
  if (e.target.matches(".eliminar")) {
    let id = e.target.dataset.id;
    let tr = document.querySelector(`#post_${id}`);
    tr.remove();
    console.log(`Usuario con ID ${id} eliminado`);
  }
});

//Eventos
addEventListener("DOMContentLoaded", acepta);
politicas.addEventListener("change", acepta);
formulario.addEventListener("submit", isValid);
formulario.addEventListener("submit", validar);
nombre.addEventListener("keydown", letras);
apellido.addEventListener("keydown", letras);
telefono.addEventListener("keydown", numeros);
documento.addEventListener("keydown", numeros);
nombre.addEventListener("blur", limpiar);
apellido.addEventListener("blur", limpiar);
telefono.addEventListener("blur", limpiar);
documento.addEventListener("blur", limpiar);
usuario.addEventListener("blur", limpiar);
contrasena.addEventListener("blur", limpiar);
