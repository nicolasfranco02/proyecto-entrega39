
import { strict as assert } from 'assert'
import { existsSync, readFileSync, unlinkSync } from 'fs'
import ContenedorMongo from '../models/containers/container.js'


describe("Test de integración de tareas", function () {

    it('debería crear el contenedor de tareas vacío', function () {
        const todos = new ContenedorMongo()
        assert.strictEqual(todos.getAll().length, 0)
    })

    it('debería adicionar tareas correctamente', function () {
        const todos = new ContenedorMongo()

        todos.save("run code")
        assert.strictEqual(todos.getAll().length, 1)
        assert.deepStrictEqual(todos.getAll(), [ { title: 'run code', complete: false } ])

        todos.save("otra tarea")
        assert.strictEqual(todos.getAll().length, 2)
        assert.deepStrictEqual(todos.getAll(), [
            { title: 'run code', complete: false },
            { title: 'otra tarea', complete: false }
        ])
    })

    it('debería marcar una tarea como completa', function () {
        const todos = new ContenedorMongo()

        todos.save("run code")
        todos.save("otra tarea")

        todos.actualizar("run code")
        assert.deepStrictEqual(todos.getAll(), [
            { title: 'run code', complete: true },
            { title: 'otra tarea', complete: false }
        ])

    })
})

describe("comprobar error en completar tarea inexistente", function () {

    it('deberia dar error cuando no hay tareas cargadas', function () {
        const todos = new ContenedorMongo()

        const errorEsperado = new Error('No hay tareas')
        assert.throws(() => {
            todos.actualizar('una tareas más')
        }, errorEsperado)
    })

    it('deberia dar error cuando la tarea a completar no existe', function () {
        const todos = new ContenedorMongo()
        todos.save("run code")

        const errorEsperado = new Error('Tarea no encontrada')
        assert.throws(() => {
            todos.actualizar('una tareas más')
        }, errorEsperado)
    })
})

describe("comprobando que saveToFileCb() funcione bien", function () {
    it('debería guardar una tarea en el archivo todos.txt', function (done) {
        const todos = new ContenedorMongo()
        todos.save('guardar tarea callback')
        todos.saveToFileCb(err => {
            assert.strictEqual(existsSync('todos.txt'), true)
            let contenidoEsperado = 'guardar tarea callback,false'
            let content = readFileSync('todos.txt').toString();
            assert.strictEqual(content, contenidoEsperado)
            done(err)
        })
    })
})


describe("comprobando que saveToFilePromises() funcione bien", function () {

    before(function () {
        console.log('\n********* Comienzo TOTAL de Test *********')
    })

    after(function () {
        console.log('\n********* Fin TOTAL de Test *********')
    })

    beforeEach(function () {
        console.log('\n********* Comienzo Test *********')
    })

    beforeEach(function () {
        this.todos = new ContenedorMongo()
    })

    afterEach(function () {
        if (existsSync('todos.txt')) {
            unlinkSync('todos.txt')
        }
    })

    afterEach(function () {
        console.log('********* Fin Test *********\n')
    })

    it('debería guardar una tarea en el archivo todos.txt (then/catch)', function () {
        //const todos = new Todos()
        //todos.save('guardar tarea Promises TC')
        this.todos.save('guardar tarea Promises TC')
        //return todos.saveToFilePromise().then(() => {
        return this.todos.saveToFilePromise().then(() => {
            assert.strictEqual(existsSync('todos.txt'), true)
            let contenidoEsperado = 'guardar tarea Promises TC,false'
            let content = readFileSync('todos.txt').toString();
            assert.strictEqual(content, contenidoEsperado)
        })
    })

    it('debería guardar una tarea en el archivo todos.txt (async/await)', async function () {
        //const todos = new Todos()
        //todos.save('guardar tarea Promises AA')
        this.todos.save('guardar tarea Promises AA')

        //await todos.saveToFilePromise()
        await this.todos.saveToFilePromise()

        assert.strictEqual(existsSync('todos.txt'), true)
        let contenidoEsperado = 'guardar tarea Promises AA,false'
        let content = readFileSync('todos.txt').toString();
        assert.strictEqual(content, contenidoEsperado)
    })

})
