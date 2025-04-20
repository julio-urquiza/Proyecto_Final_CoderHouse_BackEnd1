import { CartService } from "../services/cart-service";

class CartController {
    constructor(service) {
        this.service = service;
    }
}

export const cartController = new CartController(CartService);