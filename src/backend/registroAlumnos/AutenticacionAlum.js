const { Router } = require('express')
const middleware = require('./Middleware')
const UserAlum = require('./UsuarioAlum')
const router = Router()

router.get('/', middleware, async(req, res) => {
   res.send(req.userAlum)
})

router.post('/sign-up', async (req, res) => {
   try {
      const userAlum = new UserAlum(req.body)
      await userAlum.save()
      const token = await userAlum.generateAuthToken()
      res.status(201).send({ userAlum,token})
   } catch (error) {
      console.log("error Registro")
      res.status(400).send(error)
      
   }
})

router.post('/login', async(req, res) => {
   try {
      const { nombre, password, profesor} = req.body
      const userAlum = await UserAlum.findByCredentials(nombre, password, profesor)
      if (!userAlum) {
         return res.status(401).send({error: 'Inicio sesión fallido. Comprueba tus credenciales'})
      }
      const token = await userAlum.generateAuthToken()
      res.send({ userAlum, token })
   } catch (error) {
      console.log("error Inicio Sesion")
      res.status(400).send(error)
      
   }

})

router.post('/logout', middleware, async (req, res) => {
   try {
      req.userAlum.tokens = req.userAlum.tokens.filter((token) => {
      return token.token != req.token
   })
   await req.userAlum.save()
   res.send()
   } catch (error) {
      res.status(500).send(error)
   }
})

module.exports = router