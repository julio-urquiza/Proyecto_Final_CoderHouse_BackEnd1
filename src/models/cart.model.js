import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
            },
            quantity: {
            type: Number,
            required: true
            }
        }
    ]
});

// Middleware pre que realiza la población automáticamente
// cartSchema.pre(['find', 'findOne'], function (next) {
//     this.populate('products.product', '_id title price');
//     next();
// });

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;