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
            req.flash("error", "Requested Job not found!")
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
            req.flash("error", "Something went wrong!")
           res.redirect("/");
       }else{
            req.flash("success", "Job details updated succesfully!")
           res.redirect("/");
       }
    });
 });


//job delete route
router.delete("/jobs/:id", middleware.checkJobOwnership, function(req, res){
    Job.findByIdAndRemove(req.params.id, function(err,){
        if(err){
            req.flash("error", "Job not found!")
            res.redirect("/");
        }else{
            req.flash("success", "Job Successfully deleted!")
            res.redirect("/");
        }
    });
});

module.exports = router;