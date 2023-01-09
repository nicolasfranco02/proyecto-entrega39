import ProductosFactory from "../classes/productosFactory.class.js";

const DAO = ProductosFactory.get()

export async function obtenerProductos(){
    return await DAO.getAll();

}

export async function guardarProductos(){
    return await DAO.save()
}

export async function eliminarProductos(){
    return await DAO.deleteByid()
}
export  async function actualizarProductos(){
    return await DAO.actualizar()
}