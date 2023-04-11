class productoController {
    constructor() {
        this.listaProductos = [];
    }

    subir() {
        let obtenerListaJSON = localStorage.getItem("listaProductos")

        if (obtenerListaJSON) {
            this.listaProductos = JSON.parse(obtenerListaJSON)
        }
    }
    mostrarEnDOM(contenedor_productos) {
        contenedor_productos.innerHTML = ""
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src ="./img/funko-img${producto.id}.jpg" class="card-img-top" alt = "...">
            <div class="card-body" >
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <a href="#" class="btn btn-primary" id="funko${producto.id}">Añadir al carrito</a>
            </div>
    </div >`
        });
    }
}
class carritoController {
    constructor() {
        this.listaCarrito = []
    }
    subir() {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if (obtenerListaJSON) {
            this.listaCarrito = JSON.parse(obtenerListaJSON)
        }
    }

    anadir(producto) {
        this.listaCarrito.push(producto);
        let arrformatoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrformatoJSON)
    }
    borrar(posicionDelObjetoABorrar) {
        this.listaCarrito.splice(posicionDelObjetoABorrar, 1);
    }

    mostrarEnDOM(contenedor_carrito) {
        contenedor_carrito.innerHTML = "";
        for (let i = 0; i < this.listaCarrito.length; i++) {
            contenedor_carrito.innerHTML += `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src ="./img/funko-img${this.listaCarrito[i].id}.jpg" class="card-img-top" alt = "...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title font-weight-bolder border-bottom-0">${this.listaCarrito[i].nombre}</h5>
                                <p class="card-text">cantidad: x ${this.listaCarrito[i].cantidad} unidades</p>
                                <button id="borrar${i}" class="buttonTrash"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            document
                .getElementById(`borrar${i}`)
                .addEventListener("click", () => {
                    this.borrar(i);
                    localStorage.setItem(
                        "listaCarrito",
                        JSON.stringify(this.listaCarrito)
                    );
                    this.mostrarEnDOM(contenedor_carrito);
                });
        }
        const total = this.listaCarrito.reduce((acc, el) => acc + el.precio, 0);
        const totalFinal = document.getElementById("totalFinal")
        console.log(total)
        totalFinal.innerText = `Total: $ ${total}`
    }
    limpiar() {
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }
}

const controladorProductos = new productoController()
const controladorCarrito = new carritoController()

controladorProductos.subir()
controladorCarrito.subir()

//DOM
const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")
const terminarCompra = document.getElementById("terminarCompra")

//app
controladorProductos.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)


controladorProductos.listaProductos.forEach(producto => {
    const productoQueSeAnade = document.getElementById(`funko${producto.id}`)
    productoQueSeAnade.addEventListener("click", () => {
        controladorCarrito.anadir(producto)
        controladorCarrito.subir()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
        console.log(controladorCarrito.listaCarrito)
    })
})

terminarCompra.addEventListener("click", () => {
    if (controladorCarrito.listaCarrito.length > 0) {

        controladorCarrito.limpiar()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'COMPRA FINALIZADA',
            showConfirmButton: false,
            timer: 1500
        })

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'NO HAY PRODUCTOS EN TU CARRITO',
        })
    }

})

