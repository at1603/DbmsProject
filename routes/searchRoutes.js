var express = require("express"),
    router = express.Router(),
    User = require("../models/userSchema"),
    Blog = require("../models/blogSchema"),
    Employer = require("../models/employerSchema"),
    Resume = require('../models/resumeSchema'),
    Job = require("../models/jobSchema"),
    middleware = require('../middleware');
    

router.get("/searchPage/:id", middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("search/searchPage",{user: foundUser});
        }
    })
});

router.post("/searchPage/:id",middleware.isLoggedIn, function(req,res){
   var qual = req.body.qual,
       loc = req.body.loc;
    
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("search/searchPage", {user:foundUser});
        }
    });
});

module.exports = router;