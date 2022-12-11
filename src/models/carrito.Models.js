import {model ,Schema } from "mongoose";

const carritoSchema = Schema({
    nombre:{type: String,  require: true},
    precio:{type: String,  require: true},
    imagen:{type: String,  require: true},
})

const carritoModel = model('ordenesDeCompra', carritoSchema);

export default carritoModel;