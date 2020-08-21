var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var path  = require("path");

app.use(express.static(path.join(__dirname + '/public')));
var indexRoutes = require('./routes/index');
var authRoutes = require("./routes/authRoutes");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(indexRoutes);
app.use(authRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is connected!!");
});
