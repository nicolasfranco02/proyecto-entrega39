import carritoModel from "../carrito.Models.js";
import ContenedorMongo from "../containers/container.js";

class CarritoDaos extends ContenedorMongo{
    constructor(){
        super(carritoModel)
    }
}
export default CarritoDaos;