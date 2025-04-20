import { Cartmodel } from "./models/cart.model.js";
import MongoDao from "./mongo-dao.js";

class CartDao extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export const cartDao = new CartDao(CartModel);