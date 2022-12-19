/*import { Router } from "express";
import { guardarUsuarios, loginUsuario } from "../controllers/sesion.controllers.js";

const routerSesion = Router();

//routerSesion.get('/login',obtenerUsuarios )
routerSesion.post('/register', guardarUsuarios)


routerSesion.get('/register', (req, res )=>{
    res.render( 'formularioinicio.hbs' )
})


routerSesion.post('/login', loginUsuario)

routerSesion.get('/login', (req, res )=>{
    res.render( 'login.hbs'  )
})
routerSesion.post('login', loginUsuario)

routerSesion.get('/register-error', (req, res) => {
res.render('errorsesion.hbs')
})

routerSesion.get('/logout', (req, res)=> {
    req.logOut(err => {
        res.redirect('/');
    });
    })
    


export default routerSesion;*/