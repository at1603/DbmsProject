var express = require("express"),
    router = express.Router(),
    User = require("../models/userSchema"),
    Blog = require("../models/blogSchema"),
    Employer = require("../models/employerSchema"),
    Resume = require('../models/resumeSchema'),
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

router.get("/user/:id/userProfile", middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
        Blog.find().where('author.id').equals(foundUser._id).exec(function(err,blogs){
         if(err){
            res.redirect("/");
         }else{
            if(foundUser.role==="employer"){
                 Employer.find().where('handler.id').equals(foundUser._id).exec(function(err,foundEmp){
                     if(err){
                         console.log(err);
                     }
                    res.render("provider/userProfile", {user:foundUser,blogs:blogs,employer:foundEmp});
                 });
            }
            else if(foundUser.role==="worker"){
                Resume.find().where('handler.id').equals(foundUser._id).exec(function(err, foundRes){
                   if(err){
                       console.log(err);
                   } else{
                       res.render("seeker/userProfile",{user:foundUser,blogs:blogs,resume:foundRes});
                   }
                });
            }
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


router.get("/seeker/:id/resume", middleware.isLoggedIn, function(req, res){
   User.findById(req.params.id, function(err, foundUser){
       if(err){
           console.log(err);
       }else{
           res.render("seeker/createResume",{user:foundUser})
       }
   }) 
});

router.post("/seeker/:id/resume", middleware.isLoggedIn, function(req,res){
   var handler = {
              id: req.user._id,
              username: req.user.username
        },
        proSum = req.body.proSum,
        empHis = req.body.empHis,
        edu = req.body.edu,
        webLink = req.body.webLink, 
        skills = req.body.skills,
        lang = req.body.lang,
        intern = req.body.intern, 
        exCurri = req.body.exCurri;
        
    var newRes = {handler:handler,
                    proSum:proSum, 
                    empHis: empHis, 
                    edu:edu, 
                    webLink:webLink, 
                    skills:skills, 
                    lang:lang, 
                    intern:intern, 
                    exCurri:exCurri
                };
    
    Resume.create(newRes, function(err, newResume){
       if(err){
           console.log(err);
       } else{
           res.redirect("/seeker/"+req.params.id);
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