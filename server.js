/*============================[Modulos]============================*/
import express from "express";
import exphbs from 'express-handlebars';
import path from 'path';
import { config } from "./src/config/config.js";
import connectMongo from 'connect-mongo';
import session from 'express-session';
import routerProductos from "./src/routes/productos.routes.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import routerCArrito from "./src/routes/carrito.routes.js";
import Handlebars from 'handlebars'

import passport from 'passport';
import cors from "cors"
import {Strategy} from 'passport-local';
import RegistroDaos from './src/models/daos/registro.daos.js';
import bcrypt from 'bcrypt';

import ecommerceSchema from "./src/graphql/schema.js";
import { guardarProductos, obtenerProductos } from "./src/controllers/producto.controllers.js";
import { graphqlHTTP } from "express-graphql";



const app = express();

/*------mongoatlas------*/
const MongoSTore= connectMongo.create({
   // mongoUrl: config.mongoatlas.url,
   mongoUrl:'mongodb+srv://nicolas:Radiohead02@cluster0.onm9rr1.mongodb.net/?retryWrites=true&w=majority',
    ttl:600000,
    mongoOptions: {

    }
})



app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    Cookie:{
        maxAge:60
    }
})) 
/*-----------cors---------------*/

if(config.server.NODE_ENV == 'development') {
    app.use(cors())
} else {
    app.use(cors({
        origin: 'http://localhost:8000',
        secret: process.env.SECRET_KEY,
        optionsSuccessStatus: 200,
        methods: "GET, PUT, POST"
    }));
}

/*------------ passport/ session-----------*/
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



 return  passport.authenticate('local', {successRedirect:'/productos', failureMessage:'/login'})
}

async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}
async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password);
    return match;
}

/*----------- Motor de plantillas -----------*/


app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname:'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('views', './views');
app.set('view engine','hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(passport.initialize());
app.use(passport.session());

/*========================[Rutas]============================*/
app.get('/', (req, res)=>{
    res.redirect('/productos');
});

//app.use('/api', routerSesion);

app.use('/productos', routerProductos );

app.use('/api', routerCArrito );

/*---------------sesiones -----------*/
app.get('/register', (req, res )=>{
    const {url , method} = req
    const usuario = req.body.nombre
  //  logger.info(` direccion:${url} method: ${method}`)
    res.render( 'formularioinicio.hbs', {usuario} )
})


app.post('/register',async (req, res )=>{
    const {url , method} = req
//logger.info(` direccion:${url} method: ${method}`)

  const {nombre , password} = req.body;
  const usuario = req.body.nombre


  const nuevoUsuario = DAOS_USER.find(usuario => usuario.nombre == nombre);
 // console.log(nuevoUsuario)
  if (nuevoUsuario){
    res.redirect('/register-error')
  }else {
    DAOS_USER.save({
        nombre,
        password: await generateHashPassword(password)
    })
    res.redirect('/login')
  }
})

app.get('/register-error', (req, res) => {
    const {url , method} = req
//logger.info(` direccion:${url} method: ${method}`)
res.render('errorsesion.hbs')
})


app.get('/login', (req, res )=>{
    const {url , method} = req
    //logger.info(` direccion:${url} method: ${method}`)
    res.render( 'login.hbs'  )
})
app.post('/login', passport.authenticate('local', {successRedirect:'/inicio', failureMessage:'/login'}))

app.get('/login-error', (req, res) => {
        res.render('errorsesion.hbs');
    })
    
    app.use('/api/graphql', graphqlHTTP({
        schema: ecommerceSchema,
        rootValue: {
            obtenerProductos: obtenerProductos
           

        },
        graphiql: true,
    }));
    
       

/*-------------------fin --------------*/
app.get('*', (req, res)=>{
    res.send('error')
})


//app.use('/productos', routerProductos)

/*============================[Servidor]============================*/


const usuario = process.env.PORT
console.log( "puerto" , usuario)
const PORT = config.server.PORT;

const server = app.listen(PORT, ()=>{
    console.log(`Servidor [${config.server.NODE_ENV}] en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
