import { cartDao } from "../daos/mongoDB/cart-dao.js"
import CustomError from "../utils/custom-error.js"
import Service from "./service.js"

class CartService extends Service {
    constructor(dao){
        super(dao)
    }

    agregarProducto = async (id, body) => {
        try {
            if(await this.dao.exists({_id:id, 'products.product': body.product })){
                return await this.dao.updateOne({_id: id, 'products.product': body.product},{ $inc: {'products.$.quantity': body.quantity} })
            }
            return await this.dao.updateOne({_id: id},{ $push: { products: body } })
        } catch (error) {
            throw error
        }
    }

    eliminarTodosProductosCarrito = async (id) => {
        try {
            return await this.dao.update(id,{ $set: { products: [] } })
        } catch (error) {
            throw error
        }
    }

    eliminarProductoCarrito = async (cid, pid) => {
        try {
            return await this.service.update(cid,{ $pull: { products: { product: pid }}})
        } catch (error) {
            throw error
        }
    }

    findByIdPopulate = async (id , path, select) => {
        try{
            // const cart = await this.dao.getById(id)
            // return cart.populate('products.product');
            return (await this.dao.getById(id)).populate(path, select)
        }catch (error) {
            throw error
        }
    }

    findPopulate = async (path, select) => {
        try{
            return (await this.dao.getAll()).populate(path,select)
        }catch(error){
            throw error
        }
    }
}

export const cartService = new CartService(cartDao)