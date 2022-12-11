import CarritoDaos from "../models/daos/carrito.daos.js";
import ProductosDaos from "../models/daos/productos.daos.js";


const Dao = new CarritoDaos()
export async function elimarCarrito ( req, res ) {
    try {
        const eliminarproductos = await Dao.deleteAll()
        const lista = await Dao.getAll() 
        return res.render('carrito.hbs', {eliminarproductos})
    } catch (error) {
        console.log(error);
    }
}

export async function ProductosCarrito (req, res){
    try {
        const listaDeCarrito = await Dao.getAll()
        //console.log(listaDeCarrito)
        return  res.render('carrito.hbs',{listaDeCarrito})
    } catch (error) {
        console.log(error)
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
        console.log(error)
    }
}