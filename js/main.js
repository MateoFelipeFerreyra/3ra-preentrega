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
        this.listaCarrito.forEach(producto => {
            contenedor_productos.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src ="./img/funko-img${producto.id}.jpg" class="card-img-top" alt = "...">
            <div class="card-body" >
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.precio}</p>
                <button id="comprar${producto.id}">
                comprar
                </button>
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
        let arrformatoJSON = JSON.parse(this.listaCarrito)
        localStorage.setItem("listaCarrito",arrformatoJSON)
    }

    mostrarEnDOM(contenedor_carrito) {
        contenedor_carrito.innerHTML= ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src ="./img/funko-img${producto.id}.jpg" class="card-img-top" alt = "...">
            <div class="card-body" >
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.precio}</p>
                <button id="comprar${producto.id}">
                comprar
                </button>
            </div>
    </div >`
        });
    }
}

const controladorProductos = new productoController()
const controladorCarrito = new carritoController()

controladorProductos.subir()
controladorCarrito.subir()

//DOM
const contenedor_productos = document.getElementById(contenedor_productos)
const contenedor_carrito = document.getElementById(contenedor_carrito)

//app
controladorProductos.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)


controladorProductos.listaProductos.forEach( producto => {
    const productoQueSeAnade = document.getElementById(`Funko${producto.id}`)

    productoQueSeAnade.addEventListener("click",()=>{
        controladorCarrito.anadir(producto)
        contenedor_carrito.innerHTML = ""
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
    })
})

