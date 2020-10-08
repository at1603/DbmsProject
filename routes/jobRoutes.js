var express = require("express"),
    router = express.Router(),
    User = require("../models/userSchema"),
    Blog = require("../models/blogSchema"),
    Employer = require("../models/employerSchema"),
    Resume = require('../models/resumeSchema'),
    Job = require("../models/jobSchema"),
    middleware = require('../middleware');



//job edit route
router.get("/jobs/:id/edit", middleware.checkJobOwnership, function(req,res){
    Job.findById(req.params.id, function(err, foundJob){
        if(err){
            res.redirect("/");
        }else{
            res.render("provider/jobEdit", {job:foundJob});  
        }
    });
});

//update route
router.put("/jobs/:id", middleware.checkJobOwnership, function(req,res){
    Job.findByIdAndUpdate(req.params.id, req.body.job, function(err, upadateJob){
       if(err){
           res.redirect("/");
       }else{
           res.redirect("/");
       }
    });
 });


//job delete route
router.delete("/jobs/:id", middleware.checkJobOwnership, function(req, res){
    Job.findByIdAndRemove(req.params.id, function(err,){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

module.exports = router;