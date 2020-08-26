var express = require("express"),
    router = express.Router(),
    User = require("../models/userSchema"),
    Blog = require("../models/blogSchema");
    

router.get("/provider/:id", function(req, res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("provider/show", {user:foundUser});
        }
    });
});

router.get("/seeker/:id", function(req, res){
    res.render("seeker/show");
});



module.exports = router;