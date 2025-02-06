import { Router } from "express"
import productModel from '../models/product.model.js'

const productsRouter = Router()

//ruta get que me retorna todo el listado de products
productsRouter.get('/', async(req, res) => {
    try{
        const { limit = 20, page = 1, sort = 0 } = req.query;
        let opciones = {limit: parseInt(limit), page: parseInt(page)}
        let query = req.query.query? JSON.parse(req.query.query) : {}
        if(sort == 1 || sort == -1) opciones.sort = {price: parseInt(sort)}

        const products = await productModel.paginate(query, opciones)
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
        });
    }
    catch(error){
        res.send({status: 'Error', error})
    }
})

//ruta get retorna el un producto por el id
productsRouter.get('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const product = await productModel.findById(id).lean()
        res.send(product)
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

//ruta post para products
productsRouter.post('/', async (req ,res) => {
    try{
        const product = req.body
        const result = await productModel.create(product)
        res.send({status: 'success', mensaje: 'producto creado correctamente', result})
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
        
    }
})

//ruta put para modificar productos
productsRouter.put('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const product = req.body
        const result = await productModel.findByIdAndUpdate(id,product)
        res.send({status: 'Success', mensaje: 'El producto ha sido modificado con exito', result})
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

//ruta put para eliminar productos
productsRouter.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const result = await productModel.findByIdAndDelete(id)
        res.send({status: 'Success', mensaje: 'El producto ha sido eliminado con exito'})
    }
    catch(error){
        res.send({status: 'Ocurrio un error', error})
    }
})

export default productsRouter

