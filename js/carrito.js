//Funciones del carrito como sumar, restar, borrar productos y DOM de la pestaña del carrito
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h2 class="modal-header-title">Carrito.</h2>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h2");
    modalbutton.innerHTML =`<i class="bi bi-x-circle"></i>`
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalbutton);
    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${producto.img}"
        <h3>${producto.nombre}</h3>
        <p>$ ${producto.precio}</p>
        <span class="restar"><i class="bi bi-dash-lg"></i></span>
        <p>Cantidad: ${producto.cantidad}</p>
        <span class="sumar"><i class="bi bi-plus"></i></span>
        <p>Total ${producto.cantidad * producto.precio}</p>
        `;

        modalContainer.append(carritoContent)

        //Funcion para restar productos
        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1)
                producto.cantidad--;
            pintarCarrito();
            guardadoLocal();
        });
        //Funcion para sumar productos
        let sumar = (carritoContent.querySelector(".sumar"))
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            pintarCarrito();
            guardadoLocal();
        })

        //Funcion para eliminar productos
        let eliminar = document.createElement("span");
        eliminar.innerHTML =`<i class="bi bi-trash3"></i>`
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarproductoo);
    });


    //Mostrar el total de la compra
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `<stripe-buy-button buy-button-id="buy_btn_1MpNvOIYLiw5sRv3okQfnPE2" 
    publishable-key="pk_test_51MpMXHIYLiw5sRv3Q3Zfi3ENkl3Uqx9p3NWQ1bvucqEUBpgUscuX1A0dCsUfERBsagycPcLLVMxH6uFLvdN23IUx00jOF07czs"> 
    <a href="https://buy.stripe.com/test_cN29DN7zI77t1R6144">Abonar compra</a></stripe-buy-button>
    <p class "pagar">Total a pagar: $ ${total}</p> `;

    modalContainer.append(totalCompra);
};

viewCart.addEventListener("click", pintarCarrito)

//Funcion para eliminar productos y renderizar de nuevo
const eliminarproductoo = () => {
    const foundID = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundID;
    })

    carritoCounter();
    guardadoLocal();
    pintarCarrito();
};

//Funcion para ver la cantidad de productos en el carrito sin refrescar la pagina
const carritoCounter = () => {
    marcadorCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    marcadorCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
