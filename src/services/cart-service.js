import { cartDao } from "../daos/mongoDB/cart-dao.js"
import CustomError from "../utils/custom-error.js"

class cartService {
    constructor(dao){
        this.dao = dao
    }

    getAll = async () => {
        try{
            return await this.dao.getAll()
        } catch (error){
            throw new CustomError(error)
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
            throw new Error(error)
        }
    }

    update = async (id, body) => {
        try {
        return await this.dao.update(id, body);
        } catch (error) {
        throw new Error(error);
        }
    }

    delete = async (id) => {
        try {
        return await this.dao.delete(id);
        } catch (error) {
        throw new Error(error);
        }
    }
}