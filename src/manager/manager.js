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
}

export default Manager

// const julioManager = new Manager('../BBDD/julioManager.json')

// const datos = [
//     {nombre: 'julio', apellido: 'urquiza'},
//     {nombre: 'julio', apellido: 'urquiza'},
//     {nombre: 'julio', apellido: 'urquiza'}
// ]
// julioManager.guardarDatos(datos)

// console.log(julioManager.leerDatos())