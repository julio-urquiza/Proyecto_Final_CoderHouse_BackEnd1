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

export const cartModel = mongoose.model("carts", cartSchema);