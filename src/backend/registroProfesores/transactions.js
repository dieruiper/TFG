const { Router } = require('express')
const Transaction = require('./Transaction')
const { json } = require('body-parser')

const router = Router()

function ensureLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Not authenticated' })
    }
    next()
}

router.get('/', ensureLogin, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user_id: req.user._id }).exec()
        if (!transactions) {
            throw new Error('No transactions')
        }
        res.status(200).json(transactions)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/', ensureLogin, async (req, res) => {
    const { nombre, contraseña, trimestre1,trimestre2,trimestre3 } = req.body
    const newTransaction = new Transaction({ nombre, contraseña, trimestre1,trimestre2,trimestre3, user_id: req.user._id })

    try {
        const transaction = await newTransaction.save()
        if (!transaction) {
            throw new Error('There was an error saving the transaction')
        }
        res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', ensureLogin, async (req, res) => {
    const { id } = req.params
    try {
        const transaction = await Transaction.findById(id)
        if (!transaction) {
            throw new Error('No transaction was found')
        }

        if (transaction.user_id !== String(req.user._id)) {
            return res.status(403) / json({ message: 'Unauthorized' })
        }

        const removed = await transaction.remove()

        if (!removed) {
            throw new Error('There was a problem deleting the transaction')
        }
        res.status(200).json({ id })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.get('/:nombre', ensureLogin, async (req, res) => {
    const nombre = req.params.nombre;
    try {
        const transaction = await Transaction.find({ nombre:nombre,user_id: req.user._id }).exec()
        if (!transaction) {
            throw new Error('No transactions')
        }
        res.status(200).json(transaction)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

router.put('/:nombre', ensureLogin, async (req, res) => {
    const nombre = req.params.nombre;
    const { contraseña, trimestre1,trimestre2,trimestre3,_id } = req.body
    //const actualizarTransaction = new Transaction({ nombre, contraseña, trimestre1,trimestre2,trimestre3, user_id: req.user._id })
    
    try {
        //const transaction = await Transaction.findOneAndUpdate({ nombre:nombre,contraseña:contraseña,trimestre1:trimestre1,trimestre2:trimestre2,trimestre3:trimestre3,user_id: req.user._id })
        //const transaction = await actualizarTransaction.updateOne();
        const transaction = await Transaction.updateOne({ nombre:nombre,user_id: req.user._id},
            {   
                contraseña:req.body.contraseña,
                trimestre1:req.body.trimestre1,
                trimestre2:req.body.trimestre2,
                trimestre3:req.body.trimestre3
            })
        if (!transaction) {
            throw new Error('No transactions')
        }
        res.status(200).json(transaction)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})
module.exports = router
