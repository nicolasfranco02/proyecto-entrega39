import dotenv from 'dotenv' 
import path from 'path'
import mongoose from 'mongoose'
dotenv.config( 
    {
  path : path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)}
    )

console.log(`${process.env.NODE_ENV}.env`)
console.log("hola", process.env.PORT , "chau", process.cwd())


export const config = {
    server:{
        PORT: process.env.PORT ||3000  ,
        NODE_ENV: process.env.NODE_ENV || 'development ' ,
        PERS: process.env.PERS || false
    },
    FileSystem:{
        path: path.resolve(process.cwd(), 'DB')
    },
    mongoatlas:{
        url:process.env.MONGOATLAS,
       /* database: 'test',
        collection:'proyectobackend'*/
}

}
console.log('servidor', config.server )


export default config;