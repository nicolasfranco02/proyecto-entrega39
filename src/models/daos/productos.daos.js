import ContenedorMongo from "../containers/container.js";
import productosModel from "../productos.Models.js";



class ProductosDaos extends ContenedorMongo{
    constructor (){
        super(productosModel);
    }
}
export default ProductosDaos;