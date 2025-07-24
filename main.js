// Datos de Productos de Tv e Internet separados
let nombresTV = ["Básico TV", "Premium TV", "Full HD TV"];
let preciosTV = [500, 800, 1200];

let nombresInternet = ["Internet 50MB", "Internet 100MB", "Internet 200MB"];
let preciosInternet = [700, 1000, 1500];

// Arrays para planes
let nombresPlanes = [];
let preciosPlanes = [];

// Generar planes combinados con descuento
function generarPlanes() {
  let i = 0;
  while (nombresTV[i]) {
    let j = 0;
    while (nombresInternet[j]) {
      let nombre = nombresTV[i] + " + " + nombresInternet[j];
      let precio = (preciosTV[i] + preciosInternet[j]) * 0.8; // 20% descuento
      nombresPlanes.push(nombre);
      preciosPlanes.push(precio);
      j++;
    }
    i++;
  }
}

// Iniciar la aplicación de ventas
inicio();

function inicio() {
  alert("Bienvenido a la Aplicación de Ventas de Multivisión");
  if (!nombresPlanes[0]) {
    generarPlanes();
  }

  // Mostrar listado de Productos y Planes
  let listado = "=== Listado de Productos y Planes ===\n\n";

  // Productos de TV
  listado += "Productos de TV:\n\n";
  let i = 0;
  while (nombresTV[i]) {
    listado += "- " + nombresTV[i] + " ($" + preciosTV[i] + ")\n";
    i++;
  }

  // Productos de Internet
  listado += "\nProductos de Internet:\n\n";
  let j = 0;
  while (nombresInternet[j]) {
    listado += "- " + nombresInternet[j] + " ($" + preciosInternet[j] + ")\n";
    j++;
  }

  // Planes TV + Internet
  listado += "\nPlanes TV + Internet (20% de descuento):\n\n";
  let k = 0;
  while (nombresPlanes[k]) {
    listado +=
      "- " + nombresPlanes[k] + " ($" + preciosPlanes[k].toFixed(2) + ")\n";
    k++;
  }

  alert(listado);

  let contratar = parseInt(
    prompt("¿Desea contratar nuestros Productos o Planes?\n\n1 - Si\n2 - No")
  );

  if (contratar !== 1) {
    alert("Gracias por su visita.");
    return;
  }

  // Registro del usuario
  let usuario = {
    nombre: prompt("Ingrese su Nombre:"),
    apellido: prompt("Ingrese su Apellido:"),
    contratos: [],
  };

  // Seleccionar Contratos (productos Individuales o Planes)
  let tipo = parseInt(
    prompt(
      "¿Desea contratar productos individuales o un plan combinado?\n\n1 - Productos\n2 - Plan"
    )
  );

  if (tipo === 1) {
    // TV
    let pedirPlanTV = true;
    let tvElegido = 0;
    while (pedirPlanTV) {
      let tvOpciones = "0) No deseo contratar TV\n";
      let i = 0;
      while (nombresTV[i]) {
        tvOpciones +=
          i + 1 + ") " + nombresTV[i] + " ($" + preciosTV[i] + ")\n";
        i++;
      }
      tvElegido = parseInt(
        prompt("Seleccione un Producto de TV:\n\n" + tvOpciones)
      );
      if (tvElegido === 0 || (tvElegido >= 1 && tvElegido <= i)) {
        console.log("producto entre 1 y 4");
        pedirPlanTV = false;
      } else {
        console.log("producto mayor a 4");
        alert("Opción incorrecta, intenta nuevamente.");
      }
    }
    if (tvElegido > 0) {
      usuario.contratos.push({
        nombre: nombresTV[tvElegido - 1],
        precio: preciosTV[tvElegido - 1],
      });
    }

    // Internet
    let pedirPlanInternet = true;
    let internetElegido = 0;
    while (pedirPlanInternet) {
      let internetOpciones = "0) No deseo contratar Internet\n";
      let j = 0;
      while (nombresInternet[j]) {
        internetOpciones +=
          j +
          1 +
          ") " +
          nombresInternet[j] +
          " ($" +
          preciosInternet[j] +
          ")\n";
        j++;
      }
      internetElegido = parseInt(
        prompt("Seleccione un Producto de Internet:\n\n" + internetOpciones)
      );
      if (
        internetElegido === 0 ||
        (internetElegido >= 1 && internetElegido <= j)
      ) {
        console.log("producto entre 1 y 4");
        pedirPlanInternet = false;
      } else {
        console.log("producto mayor a 4");
        alert("Opción incorrecta, intenta nuevamente.");
      }
    }
    if (internetElegido > 0) {
      usuario.contratos.push({
        nombre: nombresInternet[internetElegido - 1],
        precio: preciosInternet[internetElegido - 1],
      });
    }
  } else if (tipo === 2) {
    // Generar planes
    if (!nombresPlanes[0]) {
      generarPlanes();
    }

    let listaPlanes = "";
    let k = 0;
    while (nombresPlanes[k]) {
      listaPlanes +=
        k + 1 + ") " + nombresPlanes[k] + " ($" + preciosPlanes[k] + ")\n";
      k++;
    }
    let planIndex =
      parseInt(prompt("Seleccione un plan:\n\n" + listaPlanes)) - 1;
    if (nombresPlanes[planIndex]) {
      usuario.contratos.push({
        nombre: nombresPlanes[planIndex],
        precio: preciosPlanes[planIndex],
      });
    } else {
      alert("Plan inválido.");
    }
  } else {
    alert("Opción inválida.");
    return;
  }

  // Resumen final
  let resumen =
    "Gracias por su compra, " +
    usuario.nombre +
    " " +
    usuario.apellido +
    ".\n\nContrataste:\n\n";
  let total = 0;
  for (let i = 0; i < usuario.contratos.length; i++) {
    resumen +=
      "- " +
      usuario.contratos[i].nombre +
      " ($" +
      usuario.contratos[i].precio +
      ")\n";
    total += usuario.contratos[i].precio;
  }
  if (tipo === 1) {
    resumen += "\nTotal: $" + total;
  }
  alert(resumen);
}
