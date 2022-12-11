import dotenv from 'dotenv' 
dotenv.config()

export const config = {
    server:{
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
        PERS: process.env.PERS,
    },
    mongoatlas:{
        url:process.env.MONGOATLAS,
        database: 'test',
        collection:'proyectobackend'
}
}

