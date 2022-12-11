import { Router } from "express";
import { agregarAlCarrito, elimarCarrito, ProductosCarrito } from "../controllers/carrito.controllers.js";

const routerCArrito = Router()

routerCArrito.get('/carrito', ProductosCarrito)
routerCArrito.post('/carrito', agregarAlCarrito)
routerCArrito.delete('/carrito', elimarCarrito)

export default routerCArrito;