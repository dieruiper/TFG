const { Router } = require('express')
const Profesor = require('./Profesor')
const { json } = require('body-parser')
const User = require('./Usuario')
const router = Router()

function ensureLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Not authenticated' })
    }
    next()
}

router.get('/', ensureLogin, async (req, res) => {
    try {
        const profesores = await Profesor.find({ user_id: req.user._id }).exec()
        if (!profesores) {
            throw new Error('No profesores')
        }
        res.status(200).json(profesores)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/', ensureLogin, async (req, res) => {
    const {nombre, contraseña, trimestre1,trimestre2,trimestre3 } = req.body
    const nuevoProfesor = new Profesor({profesor: req.user.username,nombre, contraseña, trimestre1,trimestre2,trimestre3, user_id: req.user._id })

    try {
        const profesor = await nuevoProfesor.save()
        if (!profesor) {
            throw new Error('There was an error saving the profesor')
        }
        res.status(200).json(profesor)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', ensureLogin, async (req, res) => {
    const { id } = req.params
    try {
        const profesor = await Profesor.findById(id)
        if (!profesor) {
            throw new Error('No profesor was found')
        }

        if (profesor.user_id !== String(req.user._id)) {
            return res.status(403) / json({ message: 'Unauthorized' })
        }

        const removed = await profesor.remove()

        if (!removed) {
            throw new Error('There was a problem deleting the profesor')
        }
        res.status(200).json({ id })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.get('/:nombre', ensureLogin, async (req, res) => {
    const nombre = req.params.nombre;
    try {
        const profesor = await Profesor.find({ nombre:nombre,user_id: req.user._id }).exec()
        if (!profesor) {
            throw new Error('No profesores')
        }
        res.status(200).json(profesor)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

router.put('/:nombre', ensureLogin, async (req, res) => {
    const nombre = req.params.nombre;
    const { contraseña, trimestre1,trimestre2,trimestre3,_id } = req.body
    //const actualizarTransaction = new Profesor({ nombre, contraseña, trimestre1,trimestre2,trimestre3, user_id: req.user._id })
    
    try {
        //const profesor = await Profesor.findOneAndUpdate({ nombre:nombre,contraseña:contraseña,trimestre1:trimestre1,trimestre2:trimestre2,trimestre3:trimestre3,user_id: req.user._id })
        //const profesor = await actualizarTransaction.updateOne();
        const profesor = await Profesor.updateOne({ nombre:nombre,user_id: req.user._id},
            {   
                contraseña:req.body.contraseña,
                trimestre1:req.body.trimestre1,
                trimestre2:req.body.trimestre2,
                trimestre3:req.body.trimestre3
            })
        if (!profesor) {
            throw new Error('No profesores')
        }
        res.status(200).json(profesor)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})
module.exports = router
