import {Schema, model} from "mongoose";

const usuarioSchema = Schema({
    nombre: {type: String,  require: true},
    apellido: {type: String,  require: true},
    telefono: {type: String, require: true, unique: true},
    email: {type: String,  require: true},
    password: {type: String,  require: true},
});

const usuarioModel = model('usuariossesiones', usuarioSchema);

export default usuarioModel;
