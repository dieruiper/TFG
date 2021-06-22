const { Router } = require('express')
const passport = require('passport')
const User = require('./Usuario')
const { restart } = require('nodemon')

const router = Router()

router.get('/user', (req, res) => {
    if (req.user) {
        res.json(extractUser(req))
    } else {
        res.json({ user: null })
    }
})

router.post(
    '/sign-up',
    async (req, res, next) => {
        const { username, email, password } = req.body
        try {
            await User.register({ username, email }, password)
        } catch (error) {
            if (error.name === 'UserExistsError') {
                return res.status(400).json({ message: 'UserExistsError' })
            }
            return res.status(500).json({ message: 'Hubo un error registrando el usuario' })
        }
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        res.json(extractUser(req))
    }
)

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logOut()
        res.json({ message: 'Sesion cerrada' })
    } else {
        res.json({ message: 'No hay ninguna sesion abierta' })
    }
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(extractUser(req))
})

router.post(
    '/update-password',
    (req, res, next) => {
        if (!req.user) {
            return res.send({ message: 'No existe el usuario para cambiar contraseña' })
        }
        next()
    },
    async (req, res) => {
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Peticion no valida' })
        }
        try {
            const user = await User.findById(req.user._id)
            await user.changePassword(oldPassword, newPassword)
            res.json({ message: 'Contraseña cambiada' })
        } catch (error) {
            if (error.name === 'IncorrectPasswordError') {
                return res.status(400).json({ message: 'IncorrectPasswordError' })
            }
            return res.status(500).json({ message: 'Ha habido un error' })
        }
    }
)

function extractUser(req) {
    const { username, _id } = req.user
    return { user: { username, _id } }
}

module.exports = router
