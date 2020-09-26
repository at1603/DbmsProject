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
        loc = req.body.location,
        sal = req.body.salary,
        vac = req.body.vacancy, 
        ToJob = req.body.ToJob,
        skill = req.body.skill,
        qual = req.body.qual,
        lastApply = req.body.lastApply,
        contact = req.body.contact,
        mail = req.body.mail;
        
    var newJob = {handler: handler,
                    location: loc,
                    vacancy:vac,
                    ToJob: ToJob,
                    skill: skill,
                    qual: qual,
                    lastApply: lastApply,
                    contact:contact,
                    mail: mail
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