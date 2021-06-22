const { Schema, model } = require('mongoose')

const SchemaAlumnoFifa = new Schema({
    nombre: {
        type: String,
    },
    nombreCarta: {
        type: String,
    },
    valoracion: {
        type: Number,
    },
    posicion: {
        type:String
    },
    pais: {
        type:String
    },
    equipo: {
        type:String
    },
    squad: {
        type:String
    },
    ritmo: {
        type:Number
    },
    tiro: {
        type:Number
    },
    pase: {
        type:Number
    },
    regate: {
        type:Number
    },
    defensa: {
        type:Number
    },
    fisico: {
        type:Number
    },
    profesor: {
        type: String,
    },
    imagen:
     { type: String}
        
})

const AlumnoFifa = model('alumnoFifa', SchemaAlumnoFifa)

module.exports = AlumnoFifa
