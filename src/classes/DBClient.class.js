import CustomError from "./CustomError.class.js"

class DBClient {
    async connect(){
        throw new CustomError(500, ' falta implementar' ,'connect ')
    }
    async disconnect(){
        throw new CustomError(500, ' falta implementar' ,'disconnect ')
    }
}

export default DBClient;