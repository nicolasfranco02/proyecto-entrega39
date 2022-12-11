import { Router } from "express";
import { agregarAlCarrito, ProductosCarrito } from "../controllers/carrito.controllers.js";

const routerCArrito = Router()

routerCArrito.get('/carrito', ProductosCarrito)
routerCArrito.post('/carrito', agregarAlCarrito)

export default routerCArrito;