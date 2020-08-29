var express = require("express"),
    router = express.Router(),
    User = require("../models/userSchema"),
    Blog = require("../models/blogSchema"),
    middleware = require('../middleware');
    

router.get("/provider/:id", middleware.isLoggedIn,  function(req, res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("provider/show", {user:foundUser});
        }
    });
});

router.get("/seeker/:id", middleware.isLoggedIn,  function(req, res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
        Blog.find().where('author.id').equals(foundUser._id).exec(function(err,blogs){
         if(err){
            res.redirect("/");
         }
            res.render("seeker/show", {user:foundUser,blogs:blogs});
    });
    }
});
});


module.exports = router;