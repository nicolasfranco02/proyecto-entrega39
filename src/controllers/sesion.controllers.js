/*
import passport from 'passport';
import {Strategy} from "passport-local";
import RegistroDaos from "../models/daos/registro.daos.js";
import usuarioModel from "../models/registro.Models.js";
import routerSesion from '../routes/sesion.routes.js';
import bcrypt from 'bcrypt';


const DAOS_USER = new RegistroDaos()


export async function loginUsuario (req, res){
const  LocalStrategy = Strategy;

passport.use (new LocalStrategy(
    async function(username , password, done){
        const usuarioCreado = await DAOS_USER.find(usuario => usuario.nombre = username  );
        if (!usuarioCreado){
            return done(null, false);
        }else {
            const match = await verifyPass(usuarioCreado, password);
            if(!match){
                return done(null, false);
            }
            return done (null ,  usuarioCreado);
        }
    }
))

passport.serializeUser((usuario , done) => {
    done( null, usuario.nombre)
})
passport.deserializeUser((nombre, done) => {
    const usuarioCreado = DAOS_USER.find(usuario => usuario.nombre == nombre);
    done (null ,usuarioCreado);
});



 return  passport.authenticate('local', {successRedirect:'/api/inicio', failureMessage:'/api/login'})
}

async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}
async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password);
    return match;
}

export async function guardarUsuarios (req, res ){
    try {
        const {password} = req.body;
        const usuario={
            nombre:req.body.nombre,
            email:req.body.email,
            apellido:req.body.apellido,
            telefono:req.body.telefono,
            imagen:req.body.imagen,
            password: await generateHashPassword(password)
        }
    await DAOS_USER.save(usuario)
        console.log(usuario)
        const datosingresados = await DAOS_USER.getAll()
        console.log(datosingresados)
        return res.redirect('/api/login')
        
    } catch (error) {
        console.error(error);
    }
}
*/