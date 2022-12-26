
import ContenedorMemoria from "../models/containers/ContenedorMemoria.js";

const todos = new ContenedorMemoria ();
console.log(todos.getAll());

todos.save("run code")
console.log(todos.getAll())

todos.save("otra tarea")
console.log(todos.getAll())

todos.actualizar("run code2")
console.log(todos.getAll())

