import ContenedorMongo from "../containers/container.js";
import usuarioModel from "../registro.Models.js";


class RegistroDaos extends ContenedorMongo {
    constructor(){
        super(usuarioModel)
    }
}
export default RegistroDaos;