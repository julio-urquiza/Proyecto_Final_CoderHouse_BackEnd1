import { productService } from "../services/product-service.js";

class ProductController {
    constructor(service) {
        this.service = service;
    }

    traerListadoDeProductosFormateados = async(req, res) => {
        try{
            const { limit = 10, page = 1, sort} = req.query;
    
            let opciones = {limit: parseInt(limit), page: parseInt(page)}
    
            let query = req.query.query? JSON.parse(req.query.query) : {}
    
            if(sort === 'asc') opciones.sort = {price: 1}
            if(sort === 'desc') opciones.sort = {price: -1}
    
    
            const products = await this.service.paginate(query, opciones)
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
    }

    traerProductoPorId = async (req, res) => {
        try{
            const { id } = req.params
            const product = await this.service.getById(id).lean()
            res.send(product)
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    traerTodosLosProductos = async (req ,res) => {
        try{
            const product = req.body
            const result = await this.service.create(product)
            res.send({status: 'success', mensaje: 'producto creado correctamente', result})
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
            
        }
    }

    modificarProductos = async (req, res) => {
        try{
            const { id } = req.params
            const product = req.body
            const result = await this.service.update(id,product)
            res.send({status: 'Success', mensaje: 'El producto ha sido modificado con exito', result})
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

    eliminarProductos = async (req, res) => {
        try{
            const { id } = req.params
            const result = await this.service.delete(id)
            res.send({status: 'Success', mensaje: 'El producto ha sido eliminado con exito'})
        }
        catch(error){
            res.send({status: 'Ocurrio un error', error})
        }
    }

}

export const productController = new ProductController(productService);