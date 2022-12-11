import ProductosDaos from "../models/daos/productos.daos.js";

const DAOS = new ProductosDaos()


export async function obtenerProductos (req, res){
    try {
        const listaDeProductos = await DAOS.getAll()
        return res.render('vistas' ,{listaDeProductos})
    } catch (error) {
        console.log(error);
        
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
        console.log(error);
        
    }
}