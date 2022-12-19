
import  logger  from "../config/loggers.js";
import mongoose from "mongoose";
import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";
import config from "../config/config.js";

const strConn = process.env.MONGOATLAS

class atlasClient extends DBClient{
constructor(){
    super();
    this.connected = false;
    this.client = mongoose;
}

async connect (){
    try{
        await this.client.set('strictQuery', false)
        await this.client.connect('mongodb+srv://nicolas:Radiohead02@cluster0.onm9rr1.mongodb.net/?retryWrites=true&w=majority')
        this.connected = true;
    logger.info('base de datos conectada')
    }
    catch(error){
        const errorGuardar = new CustomError(500, 'error al conectarse a atlas', error);
        logger.error(errorGuardar)
        throw errorGuardar
    }
}

async disconnect(){
    try {
        await this.client.connection.close();
        this.connected = false;
        logger.info('base de datos desconectada')
        
    } catch (error) {
        const errorGuardar = new CustomError(500, 'error al conectarse a atlas', error);
        logger.error(errorGuardar)
        throw errorGuardar
        
    }
}

}

export default atlasClient;