import CustomError from "./CustomError.class.js"


class Contenerdor {
    async getAll(){
        throw new CustomError(500, ' falta implementar',' getAll ')
    }
    async getByid(){
        throw new CustomError(500, ' falta implementar' ,' getByid ')
    }
    async save(){
        throw new CustomError(500, ' falta implementar' ,' save ')
    }
    async agregar(){
        throw new CustomError(500, ' falta implementar', 'agregar ')
    }
    async actualizar(){
        throw new CustomError(500, ' falta implementar',' actualizar ')
    }
    async deleteByid(){
        throw new CustomError(500, ' falta implementar ','deleteByid ')
    }
    async deleteAll(){
        throw new CustomError(500, ' falta implementar', 'deleteAll ')
    }
}
export default Contenerdor;