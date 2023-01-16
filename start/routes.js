'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const productosModel = use(`App/Models/Producto`)

Route.on('/').render('welcome')
/*Route.get('/productos', async()=>{
    return await (productosModel.all())
})*/

Route.get('/productos', async({view})=>{
   
    const prod = (await (productosModel.all())).toJSON();
     return view.render('listaProductos', {prod})
})

/*Route.post('/productos' , async(require)=>{
    const nuevo = require.body
    const prod = await (productosModel.save(nuevo))
    return send(prod)
})*/

/*Route.post('/productos', async({req})=>{
    const prod = new productosModel()

    prod.nombre= req.body.nombre
    prod.precio = req.body.precio
    prod.descripcion= req.body.descripcion
    prod.imagen= req.body.imagen

    await prod.save()
   
}).as('articles.update')*/



