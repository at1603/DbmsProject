var express = require("express"),
    router = express.Router(),
    User = require("../models/userSchema"),
    Blog = require("../models/blogSchema"),
    Employer = require("../models/employerSchema"),
    middleware = require('../middleware');
    

router.get("/provider/:id", middleware.isLoggedIn,  function(req, res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
        Blog.find().where('author.id').equals(foundUser._id).exec(function(err,blogs){
         if(err){
            res.redirect("/");
         }
            res.render("provider/show", {user:foundUser,blogs:blogs});
    });
    }
});
});

router.get("/provider/:id/userProfile", middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
        Blog.find().where('author.id').equals(foundUser._id).exec(function(err,blogs){
         if(err){
            res.redirect("/");
         }else{
             Employer.find().where('handler.id').equals(foundUser._id).exec(function(err,foundEmp){
                 if(err){
                     console.log(err);
                 }
                res.render("provider/userProfile", {user:foundUser,blogs:blogs,employer:foundEmp});
                eval(require('locus'));
             });
         }
    });
    }
});
});

router.get("/provider/:id/empProfile", middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.render('provider/createEmpPro', {user:foundUser});  
        }
    });
});

router.post("/provider/:id/empProfile", middleware.isLoggedIn, function(req, res){
   var  companyName=req.body.companyName,
        companyAddress = {
              streetAddress : req.body.streetAddress,
              city : req.body.city,
              state : req.body.state,
              zip : req.body.zip
        },
        designation = req.body.designation,
        grad = req.body.grad,
        gradCol = req.body.gradCol,
        pgrad = req.body.pgrad,
        pgradCol = req.body.pgradCol,
        desc = req.body.description,
        handler = {
              id: req.user._id,
              username: req.user.username
        };
    var newEmp = {companyName:companyName, 
                    companyAddress:companyAddress, 
                    designation:designation, 
                    grad:grad, 
                    gradCol:gradCol, 
                    pgrad:pgrad, 
                    pgradCol:pgradCol, 
                    description:desc,
                    handler:handler,
                };
    
    Employer.create(newEmp, function(err, newlyEmployer){
       if(err){
           console.log(err);
       } else{
           res.redirect("/provider/" + req.params.id)
       }
    });
});


//seeker routes
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