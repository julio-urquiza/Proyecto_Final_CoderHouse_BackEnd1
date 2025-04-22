import { productModel } from "./models/product.model.js";
import MongoDao from "./mongo-dao.js";

class ProductDao extends MongoDao {
    constructor(model) {
        super(model);
    }

    paginate = async (query, opciones) => {
        try{
            return this.model.paginate(query, opciones)
        }catch(error){
            throw error
        }
    }
}

export const productDao = new ProductDao(productModel);