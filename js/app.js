
const contenidoCards = document.getElementById("contenidoCards");
const viewCart = document.getElementById("viewCart");
const modalContainer = document.getElementById("contenido-modal");
const marcadorCarrito = document.getElementById("marcadorCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${producto.img}"
    <h3>${producto.nombre}</h3>
    <p class="precio">$ ${producto.precio}</p>
    `;

    contenidoCards.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "Agregar al Carrito";
    comprar.className = "Agregar al Carrito";

    content.append(comprar);

    comprar.addEventListener("click", () => {

        const repetir = carrito.some((repetirproducto) => repetirproducto.id === producto.id);

        if (repetir === true) {
            carrito.map((prod) => {
                if (prod.id === producto.id)
                    prod.cantidad++;
            });
        } else {

            carrito.push({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,

            });
        }
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        guardadoLocal();
    });
});
