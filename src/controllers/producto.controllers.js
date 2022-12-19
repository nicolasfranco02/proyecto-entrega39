import ProductosFactory from "../classes/productosFactory.class.js";
import ProductosDaos from "../models/daos/productos.daos.js";
import CustomError from "../classes/CustomError.class.js"

const DAOS = ProductosFactory.get();


export async function obtenerProductos (req, res){
    try {
        const listaDeProductos = await DAOS.getAll()
        return res.render('vistas' ,{listaDeProductos})
    } catch (error) {
        throw new CustomError(500, 'no se pudo obtener los productos', error);
        
    }
}

export async function guardarProductos (req, res){
    try {
        const ingresarProductos ={
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            precio:req.body.precio,
            imagen:req.body.imagen,
        }
    
    await DAOS.save(ingresarProductos)
    const listaDeProductos = await DAOS.getAll()
   return res.render('vistas', {listaDeProductos})
    } catch (error) {
        throw new CustomError(500, 'no se pudo guardar el productos', error);
    }
}