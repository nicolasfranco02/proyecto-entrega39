import { buildSchema } from 'graphql';

const ecommerceSchema = buildSchema(


    ` 
    input ProductosInput {
        titulo: String,
        descripcion: String,
      }
    
    type Productos {
        id: ID!
        nombre: string,
        precio: string,
        desripcion: string,
        imagen: string,
    }

    type Query{
        obtenerProductos: [Productos],
        eliminarProductos: [Productos],
        actualizarProductos: [Productos],
        guardarProductos: [Productos]
    }
    
    `
);
export default ecommerceSchema;