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

    mostrarEnDOM(contenedor_carrito) {
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src ="./img/funko-img${producto.id}.jpg" class="card-img-top" alt = "...">
            <div class="card-body" >
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
            </div>
    </div >`
        });
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

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'NO HAY PRODUCTOS EN TU CARRITO',
          })
    }

})

