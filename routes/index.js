var express = require("express");
var router = express.Router();

//home page route
router.get('/', function(req, res){
   res.render("landing"); 
});

//about page route
router.get("/about", function(req, res){
   res.render("about"); 
});

//contact page route
router.get("/contact", function(req, res){
   res.render("contact");
});

//policy page route
router.get("/policy/show", function(req, res){
   res.render("policy/index")
});

module.exports = router;