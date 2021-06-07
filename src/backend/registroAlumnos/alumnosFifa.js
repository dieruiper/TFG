const { Router } = require('express')
const AlumnoFifa = require('./AlumnoFifa')
const { json } = require('body-parser')

const router = Router()


router.get('/', async (req, res) => {
    try {
        console.log(req.user._id);
        console.log(req.AlumnoFifa.nombre)
        const alumnosFifa = await AlumnoFifa.find({ user_id: req.user._id }).exec()
        console.log(alumnosFifa)
        if (!alumnosFifa) {
            throw new Error('No alumnosFifa')
        }
        res.status(200).json(alumnosFifa)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const { nombre, nombreCarta,valoracion, posicion,pais,equipo,squad,ritmo,tiro,pase,regate,defensa,fisico,profesor,imagen} = req.body
    const nuevoAlumnoFifa = new AlumnoFifa({nombre, nombreCarta,valoracion, posicion,pais,equipo,squad,ritmo,tiro,pase,regate,defensa,fisico,profesor,imagen })

    try {
        const alumno = await nuevoAlumnoFifa.save()
        if (!alumno) {
            throw new Error('There was an error saving the alumno')
        }
        res.status(200).json(alumno)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:nombre', async (req, res) => {
    const { nombre } = req.params
    try {
        const alumno = await AlumnoFifa.findById(nombre)
        if (!alumno) {
            throw new Error('No alumno was found')
        }

        if (alumno.nombre !== String(req.user.nombre)) {
            return res.status(403) / json({ message: 'Unauthorized' })
        }

        const removed = await alumno.remove()

        if (!removed) {
            throw new Error('There was a problem deleting the alumno')
        }
        res.status(200).json({ id })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.get('/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    try {
        const alumno = await AlumnoFifa.find({ nombre:nombre }).exec()
        if (!alumno) {
            throw new Error('No alumnosFifa')
        }
        res.status(200).json(alumno)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

router.put('/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    const { nombreCarta,valoracion,posicion,pais,equipo,squad,ritmo,tiro,pase,regate,defensa,fisico,profesor,imagen } = req.body
    //const actualizarTransaction = new AlumnoFifa({ nombre, contraseña, trimestre1,trimestre2,trimestre3, user_id: req.user._id })
    
    try {
        //const alumno = await AlumnoFifa.findOneAndUpdate({ nombre:nombre,contraseña:contraseña,trimestre1:trimestre1,trimestre2:trimestre2,trimestre3:trimestre3,user_id: req.user._id })
        //const alumno = await actualizarTransaction.updateOne();
        const alumno = await AlumnoFifa.updateOne({ nombre:nombre},
            {   
                nombreCarta: nombreCarta,
                valoracion: valoracion,
                posicion: posicion,
                pais: pais,
                equipo: equipo,
                squad: squad,
				ritmo: ritmo,
                tiro: tiro,
                pase: pase,
                regate: regate,
                defensa: defensa,
				nombre: nombre,
                fisico: fisico,
                profesor:profesor,
                imagen: imagen
            })
        if (!alumno) {
            throw new Error('No alumnosFifa')
        }
        res.status(200).json(alumno)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

module.exports = router
