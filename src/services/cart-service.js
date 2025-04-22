import { cartDao } from "../daos/mongoDB/cart-dao.js"
import CustomError from "../utils/custom-error.js"
import Service from "./service.js"

class CartService extends Service {
    constructor(dao){
        super(dao)
    }

    findByIdPopulate = async (id , path, select) => {
        try{
            return this.dao.findById(id).populate(path, select)
        }catch (error) {
            throw error
        }
    }

    findPopulate = async (path, select) => {
        try{
            return this.dao.find().populate(path,select)
        }catch(error){
            throw error
        }
    }
}

export const cartService = new CartService(cartDao)