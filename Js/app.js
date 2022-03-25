let divEstilos = document.getElementById("divEstilos");
let contadorItems = document.getElementsByClassName("contadorItems");

async function obtenerProductos() {
    const response = await fetch('js/api.json')
    return await response.json()
}

obtenerProductos().then(productos => {
    productos.forEach((producto) => {
        divEstilos.innerHTML += `
        <div class="row col-12 sm-6 col-sm-3 ">          
            <div class="card losEstilos col">               
                <div id="${producto.id}" class="card-body mb-1 ">
                    <h5  class="card-id itemId" Style="display:none">${producto.id}</h5>
                    <h5 class="card-title"><b>${producto.nombre}</b></h5>
                    <img class="itemImg" src="imagenes/${producto.img}">
                    <p class="card-color"> Color:  <b class="itemColor">${producto.color}</b></p>
                    <p class="card-title"> Amargor:  <b class="itemAmargor">${producto.amargor}</b></p>
                    <p class="card-title"> Aroma:  <b class="itemAroma">${producto.aroma}</b></p>
                    <p class="card-title"> Alcohol ABV%:  <b class="itemAlcohol">${producto.alcohol}</b></p>
                    <p class="card-title"> Recarga Pet:  <b class="itemTamaño">${producto.tamaño}</b></p>
                    <p class="card-title"> Precio:  <b class="itemPrecio">$ ${producto.precio}</b></p>
                </div>
                <div class="card-body d-grid gap-2">
                        <button id="agregarPedido" class="btn-agregar button cta">Comprar</a>
                </div>
            </div>
            
        </div>
        `;
    })
    const btnAgregar = document.querySelectorAll(".btn-agregar");
    btnAgregar.forEach((e) =>
        e.addEventListener("click", (e) => {
            //borramos clase para mostrar precio en responsive     
            let verBtn = document.getElementById("contadorNav")
            verBtn.classList.remove('contadorNavDisplay')
            let verbtnComprar = document.getElementById("btnComprar");
            verbtnComprar.classList.remove('btnComprarDisplay');
            let verbtnVaciar = document.getElementById("btnVaciar");
            verbtnVaciar.classList.remove('btnVaciarDisplay');
            
            Toastify({
                text: "Producto Agregado al Carrito",
                className: "info",
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #00c9ad 5%, #00c9ad 95%)",
                    color: "white",
                },
            }).showToast();
        })
    );

    const clickButton = document.querySelectorAll(".button");
    const tbody = document.querySelector(".tbody");
    let carrito = [];

    clickButton.forEach((btn) => {
        btn.addEventListener("click", addToCarritoItem);
    });
    //funcion crear items
    function addToCarritoItem(e) {
        const button = e.target;
        const item = button.closest(".card");
        const itemId = item.querySelector(".itemId").textContent;
        const itemTitle = item.querySelector(".card-title").textContent;
        const itemTamaño = item.querySelector(".itemTamaño").textContent;
        const itemPrecio = item.querySelector(".itemPrecio").textContent;
        const itemImg = item.querySelector(".itemImg").src;

        const newItem = {
            id: itemId,
            title: itemTitle,
            precio: itemPrecio,
            tamaño: itemTamaño,
            img: itemImg,
            cantidad: 1,
        };
        addItemCarrito(newItem);
    }
    //funcion agregar items al carrito
    function addItemCarrito(newItem) {
        const inputElemento = tbody.getElementsByClassName("inputElemento");
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].id.trim() === newItem.id.trim()) {
                carrito[i].cantidad++;
                const inputValue = inputElemento[i];
                inputValue.value++;
                carritoTotal();
                carritoNavTotal();
                return null;
            }
        }
        carrito.push(newItem);
        renderCarrito();
    }
    //funcion para renderizar en carrito los items
    function renderCarrito() {
        tbody.innerHTML = "";
        carrito.map((item) => {
            const tr = document.createElement("tr");
            tr.classList.add("itemCarrito");
            const Content = `
            <th class="tableId d-none" scope="row">${item.id}</th>
            <td class="tableImgProducto">
            <img src=${item.img} alt="">
            </td>
            <td class="tableNombre">${item.title}</td>
            <td class="tablePrecio"> ${item.precio}</td>
            <td class="tableLitros"> ${item.tamaño}</td>
            <td class="tableCantidad">
                <input type="number" min="1" value=${item.cantidad} class="inputElemento">
                <button class="delete btn btn-danger">X</button>
            </td>
            
        `;
            tr.innerHTML = Content;
            tbody.append(tr);
            tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
            tr.querySelector(".inputElemento").addEventListener(
                "change",
                sumarCantidad
            );
        });
        carritoTotal();
        carritoNavTotal();
    }
    //notificacion de compra realizada 

    compraste = () => {
        swal({
            title: "Desea finalizar la compra?",
            text: "Si continua ya no podra modificar el carrito de compras!",
            icon: "warning",
            buttons: true,
        })
            .then((confirmaCompra) => {
                if (confirmaCompra) {
                    swal({
                        title: "Muchas gracias por tu compra!",
                        text: "Nos pondremos en contacto a la brevedad",
                        icon: "success",
                    });
                    vaciarCarrito()
                    
                } else {
                    swal({
                        text: "Podes seguir agregando productos al carrito!",
                    });
                }
            });
    };
    //vaciar carrito
    const botonVaciar = document.querySelector('#btnVaciar');
    botonVaciar.addEventListener('click', vaciarCarrito);

    function vaciarCarrito() {
        carrito = [];
        renderCarrito();
    }
    //notificacion 

    //funcion para sumar al total
    function carritoTotal() {
        let total = 0;
        const itemCartTotal = document.querySelector(".itemCartTotal");
        carrito.forEach((item) => {
            const precio = Number(item.precio.replace("$", ""));
            total = total + precio * item.cantidad;
        });
        itemCartTotal.innerHTML = `Total $${total}`;
        addLocalStorage();
    }
    //funcion para sumar al total y mostrar en Nav
    function carritoNavTotal() {
        let totalNavCarrito = 0;
        const itemNavCartTotal = document.querySelector(".itemNavCartTotal");
        const PrecioEnContadorItems = document.querySelector('.contadorItems');
        carrito.forEach((item) => {
            const precio = Number(item.precio.replace("$", ""));
            totalNavCarrito = totalNavCarrito + precio * item.cantidad;
        });
        itemNavCartTotal.innerHTML = ` $${totalNavCarrito}`;
        PrecioEnContadorItems.innerHTML = `$${totalNavCarrito}`;
        //agregamos la clase para ocultar el display en responsive
        if (totalNavCarrito == 0) {
            let verBtn = document.getElementById("contadorNav")
            verBtn.classList.add('contadorNavDisplay')
            let verbtnComprar = document.getElementById("btnComprar");
            verbtnComprar.classList.add('btnComprarDisplay')
            let verbtnVaciar = document.getElementById("btnVaciar");
            verbtnVaciar.classList.add('btnVaciarDisplay')

        }
        addLocalStorage();
    }
    //funcion para borrar items del carrito
    function removeItemCarrito(e) {
        const buttonDelete = e.target;
        const tr = buttonDelete.closest(".itemCarrito");
        const id = tr.querySelector(".tableId").textContent;
        for (let i = 0; i < carrito.length; i++) { carrito[i].id.trim() === id.trim() && carrito.splice(i, 1); }
        tr.remove();
        carritoTotal();
        carritoNavTotal();
        Toastify({
            text: "Producto Removido",
            className: "info",
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
                background: "red",
                color: "white",
            },
        }).showToast();

    }
    //modificamos la suma desde el input y utilizo un operador ternario
    function sumarCantidad(e) {
        const sumaInput = e.target;
        const tr = sumaInput.closest(".itemCarrito");
        const id = tr.querySelector(".tableId").textContent;
        carrito.forEach((item) => {
            if (item.id.trim() === id.trim()) {
                //utilizo operador ternario condicion ? caso1 :caso2;
                sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
                item.cantidad = sumaInput.value;
                carritoTotal();
                carritoNavTotal();
            }
        });
    }

    //creamos localstorage para el carrito de compras
    //guardamos string de carrito en local storage y lo guardamos en funcion de carritoTotal
    function addLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    //si hay productos en el carrito guardar en localstorage y renderizar los itemns con renderCarrito()
    window.onload = function () {
        const storage = JSON.parse(localStorage.getItem("carrito"));
        if (storage) {
            carrito = storage;
            renderCarrito();
        }
    };
    //fin 
});
