const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const request = require("request");
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const app = express();



const transactionsRoutes = require(path.join(__dirname,'./src/backend/registroProfesores/transactions.js'));
const usuario = require(path.join(__dirname,'./src/backend/registroProfesores/Usuario.js'));
const autenticacion = require(path.join(__dirname,'./src/backend/registroProfesores/Autenticacion.js'));

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

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

passport.use(usuario.createStrategy())
passport.serializeUser(usuario.serializeUser())
passport.deserializeUser(usuario.deserializeUser())

app.use(passport.initialize())
app.use(passport.session())

app.use("/",express.static("./public"));
app.use('/api/auth', autenticacion);
app.use('/api/transactions', transactionsRoutes)

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");