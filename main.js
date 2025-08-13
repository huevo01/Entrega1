//Oferta de Productos y Planes

const productosTV = [
  { id: 1, nombre: "Básico TV", precio: 500 },
  { id: 2, nombre: "Premium TV", precio: 800 },
  { id: 3, nombre: "Full HD TV", precio: 1200 },
];

const productosInternet = [
  { id: 4, nombre: "Internet 50MB", precio: 700 },
  { id: 5, nombre: "Internet 100MB", precio: 1000 },
  { id: 6, nombre: "Internet 200MB", precio: 1500 },
];

const generarPlanes = () => {
  let planes = [];
  for (const tv of productosTV) {
    for (const internet of productosInternet) {
      planes.push({
        id: `${tv.id}-${internet.id}`,
        nombre: `${tv.nombre} + ${internet.nombre}`,
        precio: (tv.precio + internet.precio) * 0.8,
      });
    }
  }
  return planes;
};

let usuario = JSON.parse(localStorage.getItem("usuario")) || null;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const aplicacion = document.getElementById("aplicacion");

//Local Storage LS
const guardarLS = () => {
  localStorage.setItem("usuario", JSON.stringify(usuario));
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const limpiarContenedor = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
};

const mostrarRegistro = () => {
  limpiarContenedor(aplicacion);

  // Registro de Usuario
  const titulo = document.createElement("h1");
  titulo.textContent = "Registro de Usuario";

  const form = document.createElement("form");

  const inputNombre = document.createElement("input");
  inputNombre.placeholder = "Nombre";
  inputNombre.required = true;

  const inputApellido = document.createElement("input");
  inputApellido.placeholder = "Apellido";
  inputApellido.required = true;

  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Registrar";

  form.append(inputNombre, inputApellido, btn);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    usuario = {
      nombre: inputNombre.value.trim(),
      apellido: inputApellido.value.trim(),
    };
    if (!usuario.nombre || !usuario.apellido) return;
    guardarLS();
    mostrarOpcionesContratacion();
  });

  aplicacion.append(titulo, form);
};

//Contratar Productos o PLanes

const mostrarOpcionesContratacion = () => {
  limpiarContenedor(aplicacion);

  const titulo = document.createElement("h1");
  titulo.textContent = `${usuario.nombre} ${usuario.apellido}, ¿Desea contratar Productos o Planes?`;

  const btnProductos = document.createElement("button");
  btnProductos.textContent = "Productos";
  btnProductos.addEventListener("click", mostrarProductosSeleccion);

  const btnPlanes = document.createElement("button");
  btnPlanes.textContent = "Planes";
  btnPlanes.addEventListener("click", mostrarPlanesSeleccion);

  aplicacion.append(titulo, btnProductos, btnPlanes);
};

//Seleccionar productos
const mostrarProductosSeleccion = () => {
  limpiarContenedor(aplicacion);

  const titulo = document.createElement("h1");
  titulo.textContent = "Seleccione los Productos que desee contratar";

  const info = document.createElement("p");
  info.textContent =
    "Puede elegir máximo 1 producto de TV y 1 de Internet. No puede repetir.";

  const sectionTV = document.createElement("div");
  const tituloTV = document.createElement("h3");
  tituloTV.textContent = "Productos de TV";
  sectionTV.appendChild(tituloTV);

  productosTV.forEach((prod) => {
    const label = document.createElement("label");
    label.style.display = "block";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "productoTV";
    radio.value = prod.id;
    label.append(radio, ` ${prod.nombre} - $${prod.precio}`);
    sectionTV.appendChild(label);
  });
  const labelNingunoTV = document.createElement("label");
  const radioNingunoTV = document.createElement("input");
  radioNingunoTV.type = "radio";
  radioNingunoTV.name = "productoTV";
  radioNingunoTV.value = "";
  radioNingunoTV.checked = true;
  labelNingunoTV.append(radioNingunoTV, " Ninguno");
  sectionTV.appendChild(labelNingunoTV);

  const sectionInternet = document.createElement("div");
  const tituloInternet = document.createElement("h3");
  tituloInternet.textContent = "Productos de Internet";
  sectionInternet.appendChild(tituloInternet);

  productosInternet.forEach((prod) => {
    const label = document.createElement("label");
    label.style.display = "block";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "productoInternet";
    radio.value = prod.id;
    label.append(radio, ` ${prod.nombre} - $${prod.precio}`);
    sectionInternet.appendChild(label);
  });
  const labelNingunoInternet = document.createElement("label");
  const radioNingunoInternet = document.createElement("input");
  radioNingunoInternet.type = "radio";
  radioNingunoInternet.name = "productoInternet";
  radioNingunoInternet.value = "";
  radioNingunoInternet.checked = true;
  labelNingunoInternet.append(radioNingunoInternet, " Ninguno");
  sectionInternet.appendChild(labelNingunoInternet);

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "Agregar al carrito";
  btnAgregar.addEventListener("click", () => {
    const seleccionadoTV = document.querySelector(
      'input[name="productoTV"]:checked'
    ).value;
    const seleccionadoInternet = document.querySelector(
      'input[name="productoInternet"]:checked'
    ).value;

    // Carrito de Productos

    carrito = [];

    if (seleccionadoTV) {
      const prodTV = productosTV.find((p) => p.id == seleccionadoTV);
      if (prodTV) carrito.push(prodTV);
    }
    if (seleccionadoInternet) {
      const prodInternet = productosInternet.find(
        (p) => p.id == seleccionadoInternet
      );
      if (prodInternet) carrito.push(prodInternet);
    }
    guardarLS();
    mostrarResumen();
  });

  const btnVolver = document.createElement("button");
  btnVolver.textContent = "Volver";
  btnVolver.style.marginLeft = "10px";
  btnVolver.addEventListener("click", mostrarOpcionesContratacion);

  aplicacion.append(
    titulo,
    info,
    sectionTV,
    sectionInternet,
    btnAgregar,
    btnVolver
  );
};

//Selecciona Planes

const mostrarPlanesSeleccion = () => {
  limpiarContenedor(aplicacion);

  const titulo = document.createElement("h1");
  titulo.textContent = "Seleccione un Plan que desee contratar";

  const planes = generarPlanes();

  const lista = document.createElement("div");

  planes.forEach((plan) => {
    const label = document.createElement("label");
    label.style.display = "block";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "planSeleccionado";
    radio.value = plan.id;

    label.append(radio, ` ${plan.nombre} - $${plan.precio.toFixed(2)}`);

    lista.appendChild(label);
  });

  const labelNinguno = document.createElement("label");
  const radioNinguno = document.createElement("input");
  radioNinguno.type = "radio";
  radioNinguno.name = "planSeleccionado";
  radioNinguno.value = "";
  radioNinguno.checked = true;
  labelNinguno.append(radioNinguno, " Ninguno");
  lista.appendChild(labelNinguno);

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "Agregar al carrito";
  btnAgregar.addEventListener("click", () => {
    const seleccionado = document.querySelector(
      'input[name="planSeleccionado"]:checked'
    ).value;

    carrito = [];

    if (seleccionado) {
      const plan = planes.find((p) => p.id == seleccionado);
      if (plan) carrito.push(plan);
    }
    guardarLS();
    mostrarResumen();
  });

  const btnVolver = document.createElement("button");
  btnVolver.textContent = "Volver";
  btnVolver.style.marginLeft = "10px";
  btnVolver.addEventListener("click", mostrarOpcionesContratacion);

  aplicacion.append(titulo, lista, btnAgregar, btnVolver);
};

//Resumen de Compra
const mostrarResumen = () => {
  limpiarContenedor(aplicacion);

  const titulo = document.createElement("h1");
  titulo.textContent = "Resumen de Compra";

  if (carrito.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "No has agregado productos al carrito.";

    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver a selección";
    btnVolver.style.marginTop = "20px";
    btnVolver.addEventListener("click", mostrarOpcionesContratacion);

    aplicacion.append(titulo, aviso, btnVolver);
    return;
  }

  const detalle = document.createElement("p");
  detalle.style.fontWeight = "bold";
  detalle.textContent = `${usuario.nombre} ${usuario.apellido}, ha adquirido:`;

  const lista = document.createElement("ul");
  carrito.forEach((prod) => {
    const listado = document.createElement("li");
    listado.textContent = `${prod.nombre} - $${prod.precio.toFixed(2)}`;
    lista.appendChild(listado);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  const totalTexto = document.createElement("p");
  totalTexto.style.fontWeight = "bold";
  totalTexto.textContent = `Precio total: $${total.toFixed(2)}`;

  aplicacion.append(titulo, detalle, lista, totalTexto);

  //Remover datos de usuario y carrito seleccionado
  localStorage.removeItem("usuario");
  localStorage.removeItem("carrito");
  usuario = null;
  carrito = [];

  const btnReiniciar = document.createElement("button");
  btnReiniciar.textContent = "Volver a Registro";
  btnReiniciar.style.marginTop = "20px";
  btnReiniciar.addEventListener("click", () => {
    mostrarRegistro();
  });

  aplicacion.appendChild(btnReiniciar);
};

//Iniciar App de Ventas

const iniciarAplicacion = () => {
  if (!usuario) {
    mostrarRegistro();
  } else {
    mostrarOpcionesContratacion();
  }
};

iniciarAplicacion();
