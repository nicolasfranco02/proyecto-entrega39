import { Router } from "express";
import { guardarProductos, obtenerProductos } from "../controllers/producto.controllers.js";

const routerProductos = Router()

routerProductos.get('/', obtenerProductos )
routerProductos.post('/', guardarProductos )

export default routerProductos;