import { Router } from "express"
import cartModel from '../models/cart.model.js'

const cartRouter = Router()

// ruta post para crear carritos
cartRouter.post('/', async (req, res) => {
    try{
        const cart = req.body
        const result = await cartModel.create(cart)
        res.send({status: 'success', mensaje: 'carrito creado correctamente', result})
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }

})

// método post para agregar productos al carrito
cartRouter.post('/:cid', async (req, res) => {
    try{
        const {cid} = req.params
        const products = req.body
        const cart = await cartModel.findById(cid)
        cart.products.push(...products)
        cart.save()
        res.send(cart)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})
// Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. 
// Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
cartRouter.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const cart = await cartModel.findById(id).populate('products.product', '_id title price')
        res.send(cart)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

// ruta get para listar todos los carritos
cartRouter.get('/', async (req, res) => {
    try{
        // const product = await cartModel.find().populate('products.product')
        const cart = await cartModel.find().populate('products.product', '_id title price')
        res.send(cart)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try{
        const {cid,pid} = req.params
        const quantity = parseInt(req.body.quantity)
        const cart = await cartModel.updateOne({_id: cid , 'products.product': pid},{ $set: {'products.$.quantity' : quantity } }, { new: true })
        res.send(cart)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

// PUT api/carts/:cid deberá ACTUALIZAR el carrito con un arreglo de productos con el formato especificado arriba.
cartRouter.put('/:cid', async (req, res) => {
    try{
        const {cid} = req.params
        const products = req.body
        // const cart = await cartModel.updateOne(cid, { $set: { products: products } }, { new: true }) ???
        const cart = await cartModel.findById(cid)
        cart.products = products
        cart.save()
        res.send(cart)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
cartRouter.delete('/:cid', async (req, res) => {
    try{
        const {cid} = req.params
        const cart = await cartModel.findById(cid)
        cart.products = []
        cart.save()
        res.send(cart)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    try{
        const {cid,pid} = req.params
        const cart = await cartModel.findByIdAndUpdate(cid,{ $pull: { products: { product: pid } } }, { new: true })
        res.send(cart)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

export default cartRouter