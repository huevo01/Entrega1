let vendedor = { usuario: "admin", pass: "1234" };
let usuario = {};
let carrito = { tv: null, internet: null, plan: null };
let instalacion = { fecha: null, hora: null };

const aplicacion = document.getElementById("app");

// ---- Utilidades ----
const limpiarContenedor = (contenedor) => (contenedor.innerHTML = "");

// ---- Login ----
const mostrarLogin = () => {
  limpiarContenedor(aplicacion);
  aplicacion.innerHTML = `
    <h2>Login</h2>
    <form id="formLogin" style="gap:20px;">
    <div class="flexRow">
      <div class="flexColum" style="width:25%">
        <label>Usuario:</label>
        <label>Contraseña:</label>
      </div>
      <div class="flexColum" style="width:48%">
        <input id="usuario" required style="width:100%">
        <input id="pass" type="password" required style="width:100%">
      </div>
    </div>
    <div class="divBtn">
      <button class="btnSecundary" type="submit">Ingresar</button>
    </div>
    <p id="mensajeError" class="error"></p> </form>
  `;

  document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (user === vendedor.usuario && pass === vendedor.pass) {
      mostrarRegistro();
    } else {
      document.getElementById("mensajeError").textContent =
        "Usuario o contraseña incorrectos.";
    }
  });
};

const guardarVenta = () => {
  try {
    const venta = {
      cliente: { ...usuario },
      carrito: { ...carrito },
      instalacion: { ...instalacion },
      fechaRegistro: new Date().toISOString(),
    };

    const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    ventas.push(venta);
    localStorage.setItem("ventas", JSON.stringify(ventas));

    // Mensaje de éxito
    const mensaje = document.createElement("p");
    mensaje.textContent = "✅ Venta registrada correctamente";
    mensaje.className = "success";
    aplicacion.appendChild(mensaje);
  } catch (error) {
    // Mensaje de error
    const mensaje = document.createElement("p");
    mensaje.textContent = "❌ No se pudo registrar la venta.";
    mensaje.className = "error";
    aplicacion.appendChild(mensaje);
  }
};

// ---- Mostrar listado de ventas ----
const mostrarVentas = () => {
  limpiarContenedor(aplicacion);
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];

  if (!ventas.length) {
    aplicacion.innerHTML = "<h2>No hay ventas registradas</h2>";
    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver";
    btnVolver.className = "btnSecundary";
    btnVolver.addEventListener("click", mostrarRegistro);
    aplicacion.appendChild(btnVolver);
    return;
  }

  let listado = "<h2>Ventas Realizadas</h2><ul>";
  ventas.forEach((v, index) => {
    listado += `
      <li>
        <strong>Venta ${index + 1}</strong><br>
        Cliente: ${v.cliente.nombre} ${v.cliente.apellido}<br>
        Documento: ${v.cliente.documento}<br>
        Productos: ${
          v.carrito.plan
            ? v.carrito.plan.nombre
            : (v.carrito.tv ? v.carrito.tv.nombre : "") +
              (v.carrito.internet ? " + " + v.carrito.internet.nombre : "")
        }<br>
        Fecha de instalación: ${v.instalacion.fecha} - ${v.instalacion.hora}<br>
        Registrada el: ${new Date(v.fechaRegistro).toLocaleString()}
      </li><br>
    `;
  });
  listado += "</ul>";

  aplicacion.innerHTML = listado;
  const btnVolver = document.createElement("button");
  btnVolver.textContent = "Volver";
  btnVolver.className = "btnSecundary";
  btnVolver.addEventListener("click", mostrarRegistro);
  aplicacion.appendChild(btnVolver);
};

// ---- Registro ----
const mostrarRegistro = () => {
  limpiarContenedor(aplicacion);
  aplicacion.innerHTML = `
    <h2>Ingreso de Cliente</h2>
    <form id="formRegistro">
    <div class="flexRow">
      <div class="flexColum" style="width:25%">
        <label>Nombre:</label>
        <label>Apellido:</label>
        <label>Documento:</label>
        <label>Teléfono:</label>
        <label>Dirección:</label>
        <label>Ciudad:</label>
      </div>
      <div class="flexColum" style="width:48%">
        <input id="nombre" required style="width:100%">
        <input id="apellido" required style="width:100%">
        <input id="documento" type="number" required style="width:100%">
        <input id="telefono" required style="width:100%">
        <input id="direccion" required style="width:100%">
        <input id="ciudad" required style="width:100%">
      </div>
    </div>
    <div class="divBtn">
      <button class="btnSecundary" id="formRegistro" type="submit">Registrar</button>
      <button class="btnSecundary" id="ventasRealizadas" type="submit">Ventas Realizadas</button>
    <div>
    <p id="mensajeError" class="error"></p>
    </form>
  `;

  document.getElementById("formRegistro").addEventListener("submit", (e) => {
    e.preventDefault();
    usuario = {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      documento: document.getElementById("documento").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      direccion: document.getElementById("direccion").value.trim(),
      ciudad: document.getElementById("ciudad").value.trim(),
    };
    mostrarSeleccion();
  });
  // Mostrar ventas registradas
  document
    .getElementById("ventasRealizadas")
    .addEventListener("click", mostrarVentas);
};

// ---- Calendario Instalación (Vanilla Calendar) ----
const mostrarCalendarioInstalacion = () => {
  limpiarContenedor(aplicacion);
  aplicacion.innerHTML = `
    <h2>Agenda de Instalación</h2>
    <div class="divCentrado">
      <div id="calendario"></div>
      <div>
        <label>Hora:</label>
        <select id="hora">
          <option value="">Seleccione una hora</option>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
        </select>
      </div>
    </div>
    <br>
    <div class="divBtn">
      <button class="btnSecundary" id="confirmarFecha">Confirmar</button>
    </div>
    <p id="mensajeError" class="error"></p>
  `;

  const calendar = new VanillaCalendar("#calendario", {
    settings: { lang: "es", selection: { day: "single" } },
    actions: {
      clickDay(event, self) {
        const hoy = new Date();
        hoy.setHours(0);
        const mañana = new Date(hoy);
        mañana.setDate(hoy.getDate());

        const fechaSeleccionada = new Date(self.selectedDates[0]);

        if (fechaSeleccionada < mañana) {
          document.getElementById("mensajeError").textContent =
            "Debe seleccionar una fecha a partir de mañana.";
          instalacion.fecha = null;
          return;
        }

        instalacion.fecha = self.selectedDates[0];
        document.getElementById("mensajeError").textContent = "";
      },
    },
  });
  calendar.init();

  document.getElementById("confirmarFecha").addEventListener("click", () => {
    const hora = document.getElementById("hora").value;
    if (!instalacion.fecha || !hora) {
      document.getElementById("mensajeError").textContent =
        "Debe elegir fecha y hora.";
      return;
    }
    instalacion.hora = hora;
    mostrarResumen();
  });
};

// Resumen
const mostrarResumen = () => {
  limpiarContenedor(aplicacion);
  let resumen = `
    <h2>Datos del Cliente</h2>
    <div>
      <p>Nombre: ${usuario.nombre} ${usuario.apellido}</p>
      <p>Documento: ${usuario.documento}</p>
      <p>Tel: ${usuario.telefono}</p>
      <p>Dirección: ${usuario.direccion}, ${usuario.ciudad}</p>
      <h2>Compra</h2>
    </div>
  `;

  let total = 0;
  if (carrito.plan) {
    resumen += `<p>${carrito.plan.nombre} - $${carrito.plan.precio.toFixed(
      2
    )}</p>`;
    total = carrito.plan.precio;
  } else {
    if (carrito.tv) {
      resumen += `<p>${carrito.tv.nombre} - $${carrito.tv.precio.toFixed(
        2
      )}</p>`;
      total += carrito.tv.precio;
    }
    if (carrito.internet) {
      resumen += `<p>${
        carrito.internet.nombre
      } - $${carrito.internet.precio.toFixed(2)}</p>`;
      total += carrito.internet.precio;
    }
  }

  resumen += `<h2>Instalación</h2> <p>Fecha: ${instalacion.fecha} - Hora: ${
    instalacion.hora
  }</p>
              <h2>Total</h2>
              <p><strong>$${total.toFixed(2)}</strong></p>`;

  // Guardar venta antes de limpiar las variables
  guardarVenta();

  aplicacion.innerHTML = `
      <h1>Resumen de Venta</h1>
      <div>${resumen}</div>
      <div class="divBtn">
        <button class="btnPrimary" id="nuevaVenta">Nueva Venta</button>
        <button class="btnPrimary" id="salirApp">Salir</button>
      </div>
  `;

  document.getElementById("nuevaVenta").addEventListener("click", () => {
    usuario = {};
    carrito = { tv: null, internet: null, plan: null };
    instalacion = { fecha: null, hora: null };
    mostrarRegistro();
  });

  document.getElementById("salirApp").addEventListener("click", () => {
    usuario = {};
    carrito = { tv: null, internet: null, plan: null };
    instalacion = { fecha: null, hora: null };
    mostrarLogin();
  });
};

// ---- Inicio ----
document.addEventListener("DOMContentLoaded", () => {
  cargarProductosYPlanes().then(() => mostrarLogin());
});
