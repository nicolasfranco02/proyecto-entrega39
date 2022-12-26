import axios from 'axios';
import { writeFile } from "fs";

const datos = await obtenerInfo('');
await escribirResumen('res_asyncawait.json', datos);

async function obtenerInfo2(productos){
    const res = await axios.get(`http://localhost:8080/productos`, {});
    return res.data;
}

async function obtenerInfo(productos){
    const res = await axios.get(`/${productos}`, {
        baseURL: `http://localhost:8080`,
        headers: {
            'Content-Type':'application/json'
        }
    });
    return res.data;
}

async function escribirResumen(archivo, datos){
    writeFile(archivo, JSON.stringify(datos, null, '\t'), error => {
        if (error) throw new Error(`Error de escritura de archivo ${archivo}`)
        console.log(`Escritura ok de archivo ${archivo}`)
    })
}
