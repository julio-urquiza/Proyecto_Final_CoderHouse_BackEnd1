import express from 'express'
import { engine } from 'express-handlebars'
import './database.js'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewRouter from './routes/views.router.js'

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
app.listen(PUERTO, () => { console.log(`http://localhost:${PUERTO}/`) })




