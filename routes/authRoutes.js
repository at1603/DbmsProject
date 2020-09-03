var express = require("express"),
    router = express.Router(),
    User = require("../models/userSchema"),
    passport = require('passport'),
    middleware = require('../middleware');

//Login get requests
router.get('/userLogin', function(req,res){
   res.render("login/userLogin"); 
});

//login post requests

router.post("/userLogin", passport.authenticate("local", 
{
    successRedirect: "/", 
    failureRedirect: "/userlogin"
    }),function(req, res){
});

//logout 

router.get("/logout", middleware.isLoggedIn, function(req,res){
   req.logout();
   // req.flash("success", "Logged Out");
   res.redirect("/");
});

//Signup get requests
router.get('/register', function(req,res){
   res.render("login/userSignup"); 
});

//sign up 

router.post("/register", function(req, res){
   var newUser = new User({
      username: req.body.username,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      avatar: req.body.avatar,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      state: req.body.state,
      zip:req.body.zip,
      city:req.body.city,
      role:req.body.userRole
   });
   //console.log(req.user._id);
   //console.log(currentUser.id);
   if(req.body.adminCode == 'secretCode123' && req.body.role == 'admin'){
      newUser.isAdmin = true;
   }
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          //return res.render("register", {error: err.message});
          res.redirect("/register");
      }else{
      passport.authenticate("local")(req, res, function(){
         //req.flash("success", "Welcome to YelpCamp " + user.username);
         res.redirect("/"); 
      });
   }
   
});
});


module.exports = router;