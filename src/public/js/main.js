const socket = io()

socket.on('productos',(data) => {
    console.log(data)
    const lista = document.getElementById('contenedorProdAct')
    lista.innerHTML = ""
    data.forEach(prod => {
        lista.innerHTML += `<li> ${prod.title} - ${prod.description} - ${prod.price} $ <button> Eliminar </button> </li>`
    });
})

// agregamos productos desde el formulario

document.getElementById('enviar').addEventListener('click', () => {
    agregarProductos()
})

const agregarProductos = () => {
    const producto = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
    }
    socket.emit('agregarProducto', producto)
}
