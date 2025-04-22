import { Router } from "express"
import { cartController } from "../controllers/cart-controller.js"

const cartRouter = Router()

//ruta post para crear carritos 
cartRouter.post('/',cartController.crearCarritos)

//metodo para agregar productos al carrito 
cartRouter.post('/:cid',cartController.agregarProductosAlCarrito) 

// Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. 
// Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
cartRouter.get('/:id',cartController.traerTodosLosProductosDeUnCarritoPopulate)

//ruta para listar todos los carritos
cartRouter.get('/',cartController.listarTodosLosCarritos)

//PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartRouter.put('/:cid/products/:pid',cartController.actualizarCantProductosDeCarrito)

// PUT api/carts/:cid deberá ACTUALIZAR el carrito con un arreglo de productos con el formato especificado arriba.
cartRouter.put('/:cid',cartController.actualizarCarritoConArregloProductos)

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
cartRouter.delete('/:cid',cartController.eliminarTodosLosProductosDeCarrito)

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
cartRouter.delete('/:cid/products/:pid',cartController.eliminarProductoSeleccionadoDeCarrito)