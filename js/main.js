class juguetes {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.listaCarrito = [];
    }
    agregar([juguetes, cantidad]) {
        this.listaCarrito.push([juguetes, cantidad]);
    }
    mostrar() {
        let mostrarJuguetes = ""
        console.log(this.listaCarrito)
        this.listaCarrito.forEach(juguetes => {
            mostrarJuguetes += " nombre: " + juguetes[0].nombre + " x" + juguetes[1] + " precio ind: $" + juguetes[0].precio + " precio TotInd: $" + juguetes[0].precio * juguetes[1] + "\n"
        })
        return mostrarJuguetes
    }
    calcularTotal() {
        let total = 0
        this.listaCarrito.forEach(juguetes => {
            total += juguetes[0].precio * juguetes[1]
        })
        return total;
    }
}

class productControler {
    constructor() {
        this.listaJuguetes = []
    }
    agregar(objJuguete) {
        this.listaJuguetes.push(objJuguete)
    }
    existe(id) {
        return this.listaJuguetes.some(juguetes => juguetes.id == id)
    }
    buscar(id) {
        return this.listaJuguetes.find(juguetes => juguetes.id == id)
    }
    mostrar() {
        let mostrarJuguetes = ""
        this.listaJuguetes.forEach(juguetes => {
            mostrarJuguetes += "id: " + juguetes.id + " nombre: " + juguetes.nombre + " precio: $" + juguetes.precio + "\n"
        })
        return mostrarJuguetes
    }
}

const carritoCompra = new Carrito();
const controladorProducto = new productControler();

controladorProducto.agregar(new juguetes(1, "Cap America Funko Pop", 15000))
controladorProducto.agregar(new juguetes(2, "Messi Funko Pop", 5000))
controladorProducto.agregar(new juguetes(3, "Spiderman Funko Pop", 10000))


const contenedor_productos = document.getElementById("contenedor_productos")
// contenedor_productos.innerHTML =
controladorProducto.listaJuguetes.forEach(producto =>{product = document.createElement('div'),
product.innerHTML = (`<div class="card" style="width: 18rem;">
    <img src ="./img/funko-img${producto.id}.jpg" class="card-img-top" alt = "...">
        <div class="card-body" >
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.precio}</p>
            <button id="boton">
            comprar
            </button>
        </div>
</div >`),
boton = document.getElementById('boton')
boton.addEventListener('click',() => { 
    carritoCompra.agregar(producto,1) 
})
contenedor_productos.append(product)})
console.log(carritoCompra.listaCarrito)
