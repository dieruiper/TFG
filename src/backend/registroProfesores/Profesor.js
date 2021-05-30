const { Schema, model } = require('mongoose')

const SchemaProfesor = new Schema({
    profesor: {
        type: String,
        required: true,
    },    
    nombre: {
        type: String,
        required: true,
    },
    contraseña: {
        type: String,
    },
    trimestre1: {
        type:Number
    },
    trimestre2: {
        type:Number
    },
    trimestre3: {
        type:Number
    },
    user_id: {
        type: String,
        required: true,
    },
})

const Profesor = model('profesor', SchemaProfesor)

module.exports = Profesor
