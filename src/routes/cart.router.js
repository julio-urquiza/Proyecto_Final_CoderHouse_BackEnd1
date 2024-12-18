import { Router } from "express";
import Manager from "../manager/manager.js"

const cartRouter = Router()
const cartManager = new Manager('./src/BBDD/carrito.json')

let carts = []

// ruta post para crear carritos
cartRouter.post('/',(req, res) => {
    const {products} = req.body

    if(!products) return res.send({status: 'Error', mensaje: 'Algun campo esta incompleto o es incorrecto'})
    
    const cart = {...{id:'1'}, ...req.body}

    carts = cartManager.leerDatos()
    carts.push(cart)
    cartManager.guardarDatos(carts)

    return res.send({status: 'success', mensaje: 'carrito creado correctamente'})
})

//ruta get para listar productos pertenecientes al carrito
cartRouter.get('/:id',(req, res) => {
    const {id} = req.params

    carts = cartManager.leerDatos()
    const carrito = carts.find(carrito => carrito.id == id)

    if(!carrito) return res.send({status: 'Error', mensaje: 'El carrito no pudo ser encontrado'})

    return res.send(carrito)
})

//ruta post para agregar productos
cartRouter.post('/:cid/product/:pid',(req, res) => {
    const {cid, pid} = req.params
    const body = req.body

    carts = cartManager.leerDatos()
    const indexOfCart = carts.findIndex(carrito => carrito.id == cid)

    if(indexOfCart == -1) return res.send({status: 'Error', mensaje: 'El carrito no pudo ser encontrado'})

    const indexOfProduct = carts[indexOfCart].products.findIndex(item => item.product == body.product)

    if(indexOfProduct == -1) {
        carts[indexOfCart].products.push(body)
        cartManager.guardarDatos(carts)
        return res.send({status: 'Success', mensaje: 'Se agrego correctamente el producto'})
    }

    carts[indexOfCart].products[indexOfProduct].quantity += body.quantity
    cartManager.guardarDatos(carts)
    return res.send({status: 'Success', mensaje: 'Se agregago correctamente el producto'})
})

export default cartRouter