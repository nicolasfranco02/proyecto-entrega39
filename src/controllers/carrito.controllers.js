import CarritoFactory from "../classes/carritoFactory.class.js";

import CustomError from "../classes/CustomError.class.js"

const Dao = CarritoFactory.get();


export async function elimarCarrito ( req, res ) {
    try {
        const eliminarproductos = await Dao.deleteAll()
        const lista = await Dao.getAll() 
        return res.render('carrito.hbs', {eliminarproductos})
    } catch (error) {
        throw new CustomError(500, 'Error al eliminar el carrito', error);
    }
}

export async function ProductosCarrito (req, res){
    try {
        const listaDeCarrito = await Dao.getAll()
        //console.log(listaDeCarrito)
        return  res.render('carrito.hbs',{listaDeCarrito})
    } catch (error) {
        throw new CustomError(500, 'no se puede mostrar la lista', error);
    }
}

export async function agregarAlCarrito( req, res ) {
    
    const idproductos = req.params.id
    console.log(idproductos)
    try {
        const productonuevo ={
            producto: req.body,
            nombre: req.body.nombre,
            precio: req.body.precio,
            imagen:req.body.imagen,
           // id: req.body.id,
            id:req.params.id,
        }
        console.log(productonuevo)
        await Dao.agregar(productonuevo)
       // return res.render( {productonuevo})

    } catch (error) {
        throw new CustomError(500, 'no se pudo agregar al carrito', error);
    }
}