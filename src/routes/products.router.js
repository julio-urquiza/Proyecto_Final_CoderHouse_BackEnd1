import { Router } from "express"
import productModel from '../models/product.model.js'

const productsRouter = Router()

//ruta get que me retorna todo el listado de products
// Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
// -limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
// -page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
// -query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
// -sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
productsRouter.get('/', async(req, res) => {
    try{
        const { limit = 10, page = 1, sort} = req.query;

        let opciones = {limit: parseInt(limit), page: parseInt(page)}

        let query = req.query.query? JSON.parse(req.query.query) : {}

        if(sort === 'asc') opciones.sort = {price: 1}
        if(sort === 'desc') opciones.sort = {price: -1}


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

