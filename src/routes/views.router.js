import { Router } from 'express'
import productModel from '../models/product.model.js'
import cartModel from '../models/cart.model.js'

const router = Router()

router.get('/products', async (req, res) => {
    try{
        const { page = 1, limit = 10 } = req.query
        const products = await productModel.paginate({},{page: parseInt(page), limit: parseInt(limit), lean:true})
        res.render('index',{products})
    }
    catch(error){
        res.status(500).json({status: 'error', error})
    }
})

router.get('/cart/:cid', async (req, res) => {
    try{
        const { cid } = req.params
        const cart = await cartModel.findById(cid).populate('products.product', '_id title price code').lean()
        res.render('cart',{cart})
    }
    catch(error){
        res.status(500).json({status: 'error', error});
    }
})

router.get('/cart', async (req, res) => {
    try{
        const carts = await cartModel.find().populate('products.product', '_id title price').lean()
        res.send(carts)
    }
    catch(error){
        res.status(500).json({status: 'error', error});
    }
})


export default router