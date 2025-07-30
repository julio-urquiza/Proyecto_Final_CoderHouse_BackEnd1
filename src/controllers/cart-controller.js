import { cartService } from "../services/cart-service.js";

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

    agregarProductoAlCarrito = async (req, res) => {
        try{
            const {carrito} = req.user
            const products = req.body
            const cart = await this.service.agregarProducto(carrito,products)
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    traerTodosLosProductosDeUnCarritoPopulate = async (req, res) => {
        try{
            const {carrito} = req.user
            const cart = await this.service.findByIdPopulate(carrito,'products.product', '_id title price')
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
            const {carrito} = req.user
            const cart = await this.service.updateOne({_id: carrito , 'products.product': req.body.product},{ $set: {'products.$.quantity': req.body.quantity } })
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }


    eliminarTodosLosProductosDeCarrito = async (req, res) => {
        try{
            const {carrito} = req.user
            const cart = await this.service.eliminarTodosProductosCarrito(carrito)
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    eliminarProductoSeleccionadoDeCarrito = async (req, res) => {
        try{
            const {carrito} = req.user
            const {pid} = req.params
            const cart = await this.service.eliminarProductoCarrito(carrito, pid)
            res.send(cart)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

}

export const cartController = new CartController(cartService);