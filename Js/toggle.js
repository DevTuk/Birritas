btnComprar.forEach((e) =>
        e.addEventListener("click", (e) => {
            if (totalNavCarrito !== 0){
            Swal.fire(
                'El Carrito esta vacio!',
                'You clicked the button!',
                'success'
            )} else {
                Swal.fire(
                    'Genial!',
                    'Gracias por tu compra!',
                    'success'
                )
                }
                     
        })
    );