import {model ,Schema } from "mongoose";

const productosSchema = Schema({
    nombre:{type: String,  require: true},
    descripcion:{type: String, require: true},
    precio:{type: String,  require: true},
    imagen:{type: String,  require: true},
})

const productosModel = model('ProductosGuardados', productosSchema);

export default productosModel;