var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    path  = require("path"),
    mongoose = require("mongoose");

var Employee = require("./models/employeeSchema"),
    Employer = require("./models/employerSchema"),
    Blog = require("./models/blogSchema");
    
var indexRoutes = require('./routes/index'),
    authRoutes = require("./routes/authRoutes");

mongoose.connect("mongodb://localhost/jobpost", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + '/public')));

//Passport Configuration
// app.use(require("express-session")({
//     secret: "This is my secret",
//     resave: false,
//     saveUninitialized: false
// }));

app.use(indexRoutes);
app.use(authRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is connected!!");
});
