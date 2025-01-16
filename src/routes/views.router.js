import { Router } from 'express'
import Manager from '../manager/manager.js'

const router = Router()
const cartManager = new Manager('./src/BBDD/productos.json')

router.get('/products', (req, res) => {
    const productos = cartManager.leerDatos()
    console.log(productos)
    res.render('home',{productos})
})

router.get('/realTimeproducts', (req, res) => {
    res.render('realTimeproducts')
})

export default router