import CarritoDaos from "../models/daos/carrito.daos.js";
import CarritoMemoria from "../models/daos/carritoMem.daos.js"
import CarritoJson from "../models/daos/carritoJson.daos.js"
import { config } from "../config/config.js";

class CarritoFactory{
    static get(){
        console.log('persistencia:' , config.server.PERS)

    switch( config.server.PERS){
        case 'MEMORIA':
            return new CarritoMemoria()
        case 'ARCHIVO':
                return new CarritoJson ()
        case 'ATLAS':
            return new CarritoDaos()
        default:
            return new CarritoMemoria()
    }    
    }
}

export default CarritoFactory;