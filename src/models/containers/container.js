import mongoose  from 'mongoose'
import atlasClient from '../../classes/atlasClient.class.js'
import contenedor from '../../classes/contenedor.class.js'


await (new atlasClient()).connect();

class ContenedorMongo extends contenedor {

constructor (modelo){
    super();
    this.coleccion = modelo
    //constructor(nombreColeccion, esquema) {
      //  this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
   
   

    async getByid(id) {
        return this.coleccion.find({_id: id})
    }

    async getAll() {
        return this.coleccion.find({})
    }

    async save(nuevoElem) {
        return this.coleccion.create(nuevoElem)
    }
    async agregar(nuevoElemento){
        return this.coleccion.insertMany(nuevoElemento)
    }

    async actualizar(id, nuevoElem) {
        return this.coleccion.updateOne({_id: id}, {$set: nuevoElem})
    }

    async deleteByid(id) {
        return this.coleccion.deleteOne({_id: id})
    }

    async deleteAll() {
        return this.coleccion.deleteMany({})
    }
}

export default ContenedorMongo;
