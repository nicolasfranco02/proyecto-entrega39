import { config } from "../config/config.js"
import ProductosDaos from "../models/daos/productos.daos.js"
import ProductosJson from "../models/daos/productosJson.daos.js"
import ProductosMemoria from "../models/daos/productosMem.daos.js"


class ProductosFactory{
    static get(){
        console.log('persistencia:' , config.server.PERS )

    switch( config.server.PERS){
        case 'MEMORIA':
            return new ProductosMemoria ()
        case 'ARCHIVO':
                return new ProductosJson ()
        case 'ATLAS':
            return new ProductosDaos ()
        default:
            return new ProductosMemoria()
    }    
    }
}

export default ProductosFactory;