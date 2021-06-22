const jwt = require('jsonwebtoken')
const UserAlum = require('./UsuarioAlum')

const middleware = async(req, res, next) => {
   const token = req.headers.authorization.split(' ')[1];
   const data = jwt.verify(token, process.env.JWT_KEY)
   try {
      const userAlum = await UserAlum.findOne({ _id: data._id, 'tokens.token': token })
      if (!userAlum) {
         throw new Error()
      }
      req.userAlum = userAlum
      req.token = token
      next()
   } catch (error) {
      res.status(401).send({ error: 'No está autorizado' })
   }

}
module.exports = middleware