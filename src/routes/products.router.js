import { Router } from "express"
import {productController} from "../controllers/product-controller.js"

const productsRouter = Router()

//ruta get que me retorna todo el listado de products
// Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
// -limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
// -page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
// -query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
// -sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
productsRouter.get('/', productController.traerDeProductosFormateados)

//ruta get retorna el un producto por el id
productsRouter.get('/:id', productController.traerProductoPorId)

//ruta post para products
productsRouter.post('/', productController.crearProducto)

//ruta put para modificar productos
productsRouter.put('/:id', productController.modificarProducto)

//ruta put para eliminar productos
productsRouter.delete('/:id', productController.eliminarProducto)

export default productsRouter

