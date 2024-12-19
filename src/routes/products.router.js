import { Router } from "express"
import Manager from "../manager/manager.js"

const productsRouter = Router()
const productManager = new Manager('./src/BBDD/productos.json')

let products = []

//ruta get que me retorna todo el listado de products
productsRouter.get('/',(req, res) => {
    products = productManager.leerDatos()
    return res.send(products)
})

//ruta get retorna el un producto por el id
productsRouter.get('/:id',(req, res) => {
    const {id} = req.params

    products = productManager.leerDatos()
    const producto = products.find(product => product.id == id)

    if(!producto) return res.send({status: 'Error', mensaje: 'No se pudo encontrar el producto'})

    res.send(producto)
})

//ruta post para products
productsRouter.post('/', (req ,res) => {
    const {title, description, code, price, stock, category} = req.body

    if(!title || !description || !code || !price || !stock || !category)
    {
        return res.send({status: 'Error', mensaje: 'Algun campo es incorrecto'})
    }
    const producto = {...{id: productManager.crearIdUnico(), status: true, thumbnails: [] },...req.body }

    products = productManager.leerDatos()
    products.push(producto)
    productManager.guardarDatos(products)

    return res.send({status: 'success', mensaje: 'producto creado correctamente'})
})

//ruta put para modificar productos
productsRouter.put('/:id', (req, res) => {
    const {id} = req.params
    const body = req.body

    if(!body.title || !body.description || !body.code || !body.price || !body.stock || !body.category || !body.thumbnails){
        return res.send({status: 'Error', mensaje: 'Uno de los campos es incorrecto'})
    }
    
    products = productManager.leerDatos()
    let index = products.findIndex(product => product.id == id)

    if(index == -1) {
        return res.send({status: 'Error', mensaje: 'El producto no ha sido encontrado'})
    }

    products[index] = {...products[index],...body}

    productManager.guardarDatos(products)

    return res.send({status: 'Success', mensaje: 'El producto ha sido modificado con exito'})
})

productsRouter.delete('/:id', (req, res) => {
    const {id} = req.params

    products = productManager.leerDatos()
    const indexOfProduct = products.findIndex(product => product.id == id)

    if(indexOfProduct == -1) return res.send({status: 'Error', mensaje: 'No se pudo encontrar el producto'})

    const productoEliminado = products.splice(indexOfProduct,1)
    productManager.guardarDatos(products)
    
    return res.send(productoEliminado)
})


export default productsRouter

