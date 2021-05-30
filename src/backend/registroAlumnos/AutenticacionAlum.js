const { Router } = require('express')
const middleware = require('./Middleware')
const UserAlum = require('./UsuarioAlum')
const router = Router()

router.get('/', middleware, async(req, res) => {
   res.send(req.userAlum)
})

router.post('/sign-up', async (req, res) => {
   // Create a new user
   try {
      const userAlum = new UserAlum(req.body)
      await userAlum.save()
      const token = await userAlum.generateAuthToken()
      res.status(201).send({ userAlum,token})
   } catch (error) {
      console.log("errorSignUp")
      res.status(400).send(error)
      
   }
})

router.post('/login', async(req, res) => {
   //Login a registered user
   try {
      const { nombre, password, profesor} = req.body
      console.log(nombre,password,profesor)
      const userAlum = await UserAlum.findByCredentials(nombre, password, profesor)
      console.log(userAlum)
      if (!userAlum) {
         return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      console.log("3")
      const token = await userAlum.generateAuthToken()
      console.log("4")
      res.send({ userAlum, token })
   } catch (error) {
      console.log("errorLogin")
      res.status(400).send(error)
      
   }

})

router.post('/logout', middleware, async (req, res) => {
   // Log user out of the application
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