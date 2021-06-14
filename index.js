const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const app = express();

const usuarioAlum = require(path.join(__dirname,'./src/backend/registroAlumnos/AutenticacionAlum.js'));
const RutasAlumnos = require(path.join(__dirname,'./src/backend/registroAlumnos/alumnosFifa.js'));
const RutasProfesores = require(path.join(__dirname,'./src/backend/registroProfesores/profesores.js'));
const usuarioProf = require(path.join(__dirname,'./src/backend/registroProfesores/Usuario.js'));
const autenticacion = require(path.join(__dirname,'./src/backend/registroProfesores/Autenticacion.js'));

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const jwt = process.env.JWT_KEY;

app.use(bodyParser.json())

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDb está conectado'))
    .catch((err) => console.log(err))

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: 'this is my secret',
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

passport.use(usuarioProf.createStrategy())
passport.serializeUser(usuarioProf.serializeUser())
passport.deserializeUser(usuarioProf.deserializeUser())

app.use(passport.initialize())
app.use(passport.session())

app.use("/",express.static("./public"));
app.use('/api/auth', autenticacion);
app.use('/api/profesores', RutasProfesores);
app.use('/api/alumnos', RutasAlumnos);
app.use('/api/authAlum', usuarioAlum);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");