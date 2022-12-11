import mongoose, { model } from 'mongoose'



export class ContenedorMongo {

    /*constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }*/
   constructor (modelo){
    this.coleccion = modelo
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
