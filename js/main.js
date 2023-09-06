const productos = [
    { nombre: "Manzana", precio: 1.5 },
    { nombre: "Banana", precio: 0.8 },
    { nombre: "Zanahoria", precio: 0.6 },
    { nombre: "Lechuga", precio: 1.2 },
    { nombre: "Papa", precio: 1.6 },
    { nombre: "Cebolla", precio: 0.9 },
    { nombre: "Tomate", precio: 0.7 },
    { nombre: "Durazno", precio: 1.2 },
    { nombre: "Frambuesa", precio: 1.6 },
    { nombre: "Cereza", precio: 0.6 },
];

const resultadoDiv = document.getElementById("resultado");
const productosSelect = document.getElementById("productos-select");
const agregarCarritoBtn = document.getElementById("agregar-carrito");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const carritoLista = document.getElementById("carrito-lista");

let carrito = obtenerCarritoLocalStorage();

productos.forEach((producto, index) => {
    const option = document.createElement("option");
    option.value = index.toString();
    option.text = producto.nombre;
    productosSelect.appendChild(option);
});

agregarCarritoBtn.addEventListener("click", () => {
    const selectedProductIndex = parseInt(productosSelect.value);

    if (selectedProductIndex >= 0) {
        const selectedProduct = productos[selectedProductIndex];
        carrito.push(selectedProduct);
        actualizarCarrito();
        mostrarMensaje("Producto agregado al carrito.");
    }
});

finalizarCompraBtn.addEventListener("click", () => {
    guardarCarritoEnLocalStorage();
    reiniciarApp();
    mostrarMensaje("Carrito guardado en el almacenamiento local y la aplicación reiniciada.");
});

function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${producto.nombre} - €${producto.precio.toFixed(2)}`;
        carritoLista.appendChild(listItem);
        total += producto.precio;
    });

    mostrarResultado(total);
}

function mostrarResultado(total) {
    resultadoDiv.textContent = `El total de su compra es: €${total.toFixed(2)}`;
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function reiniciarApp() {
    carrito = [];
    actualizarCarrito();
    productosSelect.value = "-1";
    mostrarResultado(0);
}

function obtenerCarritoLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

actualizarCarrito();