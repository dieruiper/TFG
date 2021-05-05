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
const User = require('./models/User');
const authRoutes = require('./routes/auth')
const app = express();

const profesoresAPI = require(path.join(__dirname,"./src/backend/profesoresAPI"));
const alumnosAPI = require(path.join(__dirname,"./src/backend/alumnosAPI"));
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
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(passport.initialize())
app.use(passport.session())



app.use("/",express.static("./public"));

profesoresAPI(app);
alumnosAPI(app);

app.use('/api/auth', authRoutes)

	
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");

