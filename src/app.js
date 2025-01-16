import express from 'express'
import { engine } from 'express-handlebars'
import { Server, Socket } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewRouter from './routes/views.router.js'
import Manager from './manager/manager.js'

const app = express()
const PUERTO = 8080

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))

app.engine('handlebars', engine())
app.set("view engine", 'handlebars')
app.set('views','./src/views')

//rutas
app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)
app.use('/', viewRouter)

// listen
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto ${PUERTO}`)
})

const io = new Server(httpServer) 

const productManager = new Manager('./src/BBDD/productos.json')


io.on('connection', (socket) => {
    console.log('el cliente se conecto con el backend')
    const productos = productManager.leerDatos()
    console.log(productos)
    socket.emit('productos',productos)
})