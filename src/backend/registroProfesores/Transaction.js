const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
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

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction
