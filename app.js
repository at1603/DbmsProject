var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    path  = require("path"),
    methodOverride = require('method-override'),
    mongoose = require("mongoose"),
    flash = require('connect-flash');

var User = require("./models/userSchema"),
    Blog = require("./models/blogSchema"),
    Employer = require('./models/employerSchema'),
    Resume = require("./models/resumeSchema"),
    Job = require("./models/jobSchema");
    
var indexRoutes = require('./routes/index'),
    authRoutes = require("./routes/authRoutes"),
    blogRoutes = require("./routes/blogRoutes"),
    userRoutes = require('./routes/userRoutes'),
    searchRoutes = require('./routes/searchRoutes'),
    jobRoutes = require('./routes/jobRoutes'),
    policyRoutes = require('./routes/policyRoutes');


mongoose.connect("mongodb://localhost:27017/jobpost", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + '/public')));

//Passport Configuration
app.use(require("express-session")({
    secret: "This is my secret",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use(authRoutes);
app.use(blogRoutes);
app.use(userRoutes);
app.use(searchRoutes);
app.use(jobRoutes);
app.use(policyRoutes);

app.listen(3000, function(){
    console.log("server is connected!!");
});
