import { cartService } from "../services/cart-service";

class CartController {
    constructor(service) {
        this.service = service;
    }

    crearCarritos = async (req, res) => {
        try{
            const cart = req.body
            const result = await this.service.create(cart)
            res.send({status: 'success', mensaje: 'carrito creado correctamente', result})
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    agregarProductosAlCarrito = async (req, res) => {
        try{
            const {cid} = req.params
            const products = req.body
            const cart = await this.service.findById(cid)
            cart.products.push(...products)
            cart.save()
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    traerTodosLosProductosDeUnCarritoPopulate = async (req, res) => {
        try{
            const {id} = req.params
            const cart = await this.service.findByIdPopulate(id,'products.product', '_id title price')
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    listarTodosLosCarritos = async (req, res) => {
        try{
            const cart = await this.service.findPopulate('products.product', '_id title price')
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    actualizarCantProductosDeCarrito = async (req, res) => {
        try{
            const {cid,pid} = req.params
            const quantity = parseInt(req.body.quantity)
            const cart = await cartModel.updateOne({_id: cid , 'products.product': pid},{ $set: {'products.$.quantity' : quantity } }, { new: true })
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    actualizarCarritoConArregloProductos = async (req, res) => {
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
    }

    eliminarTodosLosProductosDeCarrito = async (req, res) => {
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
    }

    eliminarProductoSeleccionadoDeCarrito = async (req, res) => {
        try{
            const {cid,pid} = req.params
            const cart = await cartModel.findByIdAndUpdate(cid,{ $pull: { products: { product: pid } } }, { new: true })
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

}

export const cartController = new CartController(cartService);