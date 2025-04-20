import express from 'express'
import { engine } from 'express-handlebars'
import { initMongoDB } from "./config/db.js";
import passport from './config/jwt-strategy.js';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewRouter from './routes/views.router.js'
import userRouter from './routes/user-router.js'

const app = express()
const PUERTO = 8080

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))

//handlebars
app.engine('handlebars', engine())
app.set("view engine", 'handlebars')
app.set('views','./src/views')

app.use(passport.initialize())

//rutas
// app.use('/api/products',productsRouter)
// app.use('/api/carts',cartRouter)
// app.use('/', viewRouter)

app.use('/api/user', userRouter)


// MongoDB
initMongoDB()
    .then(() => console.log("conectado a mongo"))
    .catch((error) => console.log(error))

// listen
app.listen(PUERTO, () => { console.log(`http://localhost:${PUERTO}/`) })




