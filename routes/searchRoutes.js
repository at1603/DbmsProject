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
            res.render("search/searchPage",{user: foundUser, flag:0});
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
            if(loc==="null"){
                Job.find({"qual":qual}).exec(function(err,foundJob){
                    if(err){
                        console.log(err);
                    }else{
                        res.render("search/searchPage", {user:foundUser, jobs:foundJob, flag:1});
                    }
                });
            }else{
                Job.find({"qual":qual, "location":loc}).exec(function(err,foundJob){
                    if(err){
                        console.log(err);
                    }else{
                        res.render("search/searchPage", {user:foundUser, jobs:foundJob, flag:1});
                    }
                });
                
            }
        }
    });
});

//offer Page
router.get("/offerPage/:id", middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            Employer.find().where('handler.id').equals(foundUser._id).exec(function(err, foundEmp){
               if(err){
                   console.log(err);
               }else{
                    res.render("search/offerPage", {user:foundUser, emp: foundEmp}); 
               }
            });
        }
    })
});

router.post("/offerPage/:id",middleware.isLoggedIn, function(req,res){
    var handler = {
              id: req.user._id,
              username: req.user.username
        },
        loc = req.body.loc,
        sal = req.body.salary,
        vac = req.body.vacancy, 
        ToJob = req.body.ToJob,
        skill = req.body.skill,
        qual = req.body.qual,
        lastApply = req.body.lastApply,
        contact = req.body.contact,
        mail = req.body.mail,
        title = req.body.title,
        about = req.body.about,
        des = req.body.description;
        
    var newJob = {handler: handler,
                    location: loc,
                    vacancy:vac,
                    ToJob: ToJob,
                    skill: skill,
                    qual: qual,
                    lastApply: lastApply,
                    contact:contact,
                    mail: mail,
                    salary: sal,
                    title: title,
                    about: about,
                    description: des
    }
    Job.create(newJob, function(err, nJob){
       if(err){
           console.log(err);
       } else{
           res.redirect("/");
       }
    });
})


module.exports = router;