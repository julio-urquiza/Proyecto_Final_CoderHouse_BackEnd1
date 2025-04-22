import { productDao } from "../daos/mongoDB/product-dao.js"
import CustomError from "../utils/custom-error.js"
import Service from "./service.js"

class ProductService extends Service {
    constructor(dao){
        super(dao)
    }

    paginate = async (query, opciones) => {
        try{
            return this.dao.paginate(query, opciones)
        }catch(error){
            throw error
        }
    }
}

export const productService = ProductService(productDao)