import fs from 'fs'

class Manager {
    constructor(ruta){
        this.ruta = ruta
    }

    guardarDatos = (array) => {
        fs.writeFileSync(this.ruta,JSON.stringify(array,null,2))
    }
    
    leerDatos = () => {
        if(fs.existsSync(this.ruta)){
            let respuesta = fs.readFileSync(this.ruta, 'utf-8')
            return JSON.parse(respuesta) 
        }
        return null
    }
    crearIdUnico = () =>{
        const lista = this.leerDatos()

        if(lista.length == 0) return 1

        let idProximo = lista[lista.length - 1].id 
        
        let condicion
        do {
            idProximo++
            condicion = lista.some(item => item.id == idProximo)
        } while (condicion);

        return idProximo
    }
}

export default Manager

// const julioManager = new Manager('../BBDD/prueba.json')

// const datos = [
//     {id: 1, nombre: 'julio', apellido: 'urquiza'},
//     {id: 2, nombre: 'julio', apellido: 'urquiza'},
//     {id: 3, nombre: 'julio', apellido: 'urquiza'}
// ]
// julioManager.guardarDatos(datos)

// console.log(julioManager.leerDatos())

// console.log(julioManager.crearIdUnico())