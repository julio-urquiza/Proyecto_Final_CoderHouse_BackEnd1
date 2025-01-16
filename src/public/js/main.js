const socket = io()

socket.on('productos',(data) => {
    console.log(data)
    const lista = document.getElementById('contenedorProdAct')
    lista.innerHTML = ""
    data.forEach(prod => {
        lista.innerHTML += `<li> ${prod.title} - ${prod.description} - ${prod.price} $ <button> Eliminar </button> </li>`
    });
})