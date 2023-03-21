let listaProductos = [
    { id: 1, nombre: "Cap America Funko Pop", precio: 6000, cantidad: 1},
    { id: 2, nombre: "Messi Funko Pop", precio: 10000, cantidad: 1},
    { id: 3, nombre: "Spiderman Funko Pop", precio: 7000, cantidad: 1}
]

const arrEnformatoJSON = JSON.stringify(listaProductos)
localStorage.setItem("listaProductos",arrEnformatoJSON)