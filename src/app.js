import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'

const app = express()
const PUERTO = 8080

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//rutas
app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)

// listen
app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto ${PUERTO}`)
})

