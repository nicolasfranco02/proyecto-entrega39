/*============================[Modulos]============================*/
import express from "express";
import exphbs from 'express-handlebars';
import path from 'path';
import { config } from "./src/config/config.js";
import connectMongo from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import routerProductos from "./src/routes/productos.routes.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import routerCArrito from "./src/routes/carrito.routes.js";
import Handlebars from 'handlebars'
import routerSesion from "./src/routes/sesion.routes.js";
import passport from 'passport';



const app = express();

/*------mongoatlas------*/
const MongoSTore= connectMongo.create({
    mongoUrl: process.env.MONGOATLAS ,
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

/*------------ mongo-----------*/
const strConn = process.env.MONGOATLAS
async function MongoBaseDatos (){
    try{  
        mongoose.connect(strConn);
        console.log( `conectados en mongo`)


    }
    catch(error){
        console.log(error)
    }
    
}
 MongoBaseDatos()
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

app.use('/api', routerSesion);

app.use('/productos', routerProductos );

app.use('/api', routerCArrito );



app.get('*', (req, res)=>{
    res.send('error')
})


//app.use('/productos', routerProductos)

/*============================[Servidor]============================*/
const PORT = config.server.PORT;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor [${config.server.NODE_ENV}] en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
