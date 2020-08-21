var express = require("express");
var router = express.Router();

//Login get requests
router.get('/empLogin', function(req,res){
   res.render("login/employerLogin"); 
});

router.get('/workLogin', function(req,res){
   res.render('login/workerLogin'); 
});
router.get('/adLogin', function(req,res){
   res.render('login/admLogin'); 
});

//Signup get requests
router.get('/empSign', function(req,res){
   res.render("login/employerSignup"); 
});

router.get('/workSign', function(req,res){
   res.render('login/workerSignup'); 
});

module.exports = router;