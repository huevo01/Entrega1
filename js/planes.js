function cargarProductosYPlanes() {
  return fetch("data/productos.json")
    .then((response) => response.json())
    .then((data) => {
      productosTV = data.tv;
      productosInternet = data.internet;

      planes = [];
      productosTV.forEach((tv) => {
        productosInternet.forEach((internet) => {
          const precioPlan = (tv.precio + internet.precio) * 0.8;
          planes.push({
            id: `${tv.id}-${internet.id}`,
            nombre: `Plan: ${tv.nombre} + ${internet.nombre}`,
            precio: parseFloat(precioPlan.toFixed(2)),
          });
        });
      });
    })
    .catch((error) => console.error("Error cargando productos:", error));
}
