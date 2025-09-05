// ---- Pantallas de productos y planes ----
const mostrarSeleccion = () => {
  limpiarContenedor(aplicacion);
  aplicacion.innerHTML = `
    <h2>Selección de Contratación</h2>
    <div class="divBtn">
      <button class="btnTerciry" id="btnProductos">Productos</button>
      <button class="btnTerciry" id="btnPlanes">Planes</button>
    </div>
  `;

  document
    .getElementById("btnProductos")
    .addEventListener("click", mostrarProductos);
  document.getElementById("btnPlanes").addEventListener("click", mostrarPlanes);
};

// ---- Mostrar Productos ----
const mostrarProductos = () => {
  if (!productosTV.length || !productosInternet.length) {
    alert("Los productos aún se están cargando.");
    return;
  }

  limpiarContenedor(aplicacion);
  aplicacion.innerHTML = `
    <h2>Productos</h2>
    <h2>TV</h2>
    <div>
      ${productosTV
        .map(
          (p) => `
        <div class="card">
          <p>${p.nombre}</p>
          <p>$${p.precio}</p>
          <input type="radio" name="tv" value="${p.id}">
        </div>
      `
        )
        .join("")}
    </div>
    <h2>Internet</h2>
    <div>
      ${productosInternet
        .map(
          (p) => `
        <div class="card">
          <p>${p.nombre}</p>
          <p>$${p.precio}</p>
          <input type="radio" name="internet" value="${p.id}">
        </div>
      `
        )
        .join("")}
    </div>
    <br>
    <div class="divBtn">
      <button class="btnPrimary" id="volverSeleccion">Volver</button>
      <button class="btnPrimary" id="confirmarProductos">Confirmar</button>
    </div>
    <p id="mensajeError" class="error"></p>
  `;

  // Volver a selección
  document
    .getElementById("volverSeleccion")
    .addEventListener("click", mostrarSeleccion);

  // Confirmar selección de productos
  document
    .getElementById("confirmarProductos")
    .addEventListener("click", () => {
      const seleccionadoTV = document.querySelector('input[name="tv"]:checked');
      const seleccionadoInternet = document.querySelector(
        'input[name="internet"]:checked'
      );

      carrito = { tv: null, internet: null, plan: null };

      if (seleccionadoTV)
        carrito.tv = productosTV.find((p) => p.id == seleccionadoTV.value);
      if (seleccionadoInternet)
        carrito.internet = productosInternet.find(
          (p) => p.id == seleccionadoInternet.value
        );

      if (!carrito.tv && !carrito.internet) {
        document.getElementById("mensajeError").textContent =
          "Debe seleccionar al menos un producto.";
        return;
      }

      // Toastify
      let mensaje = "";
      if (carrito.tv) mensaje += `${carrito.tv.nombre} `;
      if (carrito.internet) mensaje += `${carrito.internet.nombre} `;

      Toastify({
        text: `${mensaje}agregado al carrito 🛒`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "linear-gradient(to right, #0356dcff, #05ddedff)",
      }).showToast();

      mostrarCalendarioInstalacion();
    });
};

// ---- Mostrar Planes ----
const mostrarPlanes = () => {
  if (!planes.length) {
    alert("Los planes aún se están generando.");
    return;
  }

  limpiarContenedor(aplicacion);
  aplicacion.innerHTML = `
    <h2>Planes (20% OFF)</h2>
    <div>
      ${planes
        .map(
          (p) => `
        <div class="card">
          <p>${p.nombre}</p>
          <p>$${p.precio}</p>
          <input type="radio" name="plan" value="${p.id}">
        </div>
      `
        )
        .join("")}
    </div>
    <br>
    <div class="divBtn">
      <button class="btnTerciry" id="volverSeleccion">Volver</button>
      <button class="btnTerciry" id="confirmarPlan">Confirmar</button>
    </div>
    <p id="mensajeError" class="error"></p>
  `;

  // Volver a selección
  document
    .getElementById("volverSeleccion")
    .addEventListener("click", mostrarSeleccion);

  // Confirmar selección de plan
  document.getElementById("confirmarPlan").addEventListener("click", () => {
    const seleccionadoPlan = document.querySelector(
      'input[name="plan"]:checked'
    );
    carrito = { tv: null, internet: null, plan: null };

    if (seleccionadoPlan)
      carrito.plan = planes.find((p) => p.id == seleccionadoPlan.value);

    if (!carrito.plan) {
      document.getElementById("mensajeError").textContent =
        "Debe seleccionar un plan.";
      return;
    }

    // Toastify
    Toastify({
      text: `${carrito.plan.nombre} agregado al carrito 🛒`,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "linear-gradient(to right, #0356dcff, #05ddedff)",
    }).showToast();

    mostrarCalendarioInstalacion();
  });
};
