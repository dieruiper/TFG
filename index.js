const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const profesoresAPI = require(path.join(__dirname,"./src/backend/profesoresAPI"));
const alumnosAPI = require(path.join(__dirname,"./src/backend/alumnosAPI"));

var app = express();

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/",express.static("./public"));

profesoresAPI(app);
alumnosAPI(app);

app.listen(port,()=> {
    console.log("Server ready");
});

console.log("Starting server...");