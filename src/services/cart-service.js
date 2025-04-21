import { cartDao } from "../daos/mongoDB/cart-dao.js"
import CustomError from "../utils/custom-error.js"

class CartService {
    constructor(dao){
        this.dao = dao
    }

    getAll = async () => {
        try{
            return await this.dao.getAll()
        } catch (error){
            throw error
        }
    }

    getById = async (id) => {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw error;
        }
    }

    create = async (body) => {
        try{
            return await this.dao.create(body)
        }catch (error){
            throw error
        }
    }

    update = async (id, body) => {
        try {
            return await this.dao.update(id, body);
        } catch (error) {
            throw error;
        }
    }

    delete = async (id) => {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            throw error;
        }
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