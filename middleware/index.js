var middlewareObj = {};
var Blog = require('../models/blogSchema');
var User = require('../models/userSchema'),
    Job = require('../models/jobSchema');

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/userLogin");
}

//check job ownership
middlewareObj.checkJobOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Job.findById(req.params.id, function(err, foundJob){
           if(err){
               res.redirect("back");
           }else{
                //does the user own the campground
                if(foundJob.handler.id.equals(req.user._id) || req.user.isAdmin)
                {
                    next();
                }else{
                    req.flash("error", "Permission Denied! Wrong User.")
                    res.redirect("back");
                }
                
           }
        });
    }
        else{
            res.redirect("back");
    }
}

//check blog ownership
middlewareObj.checkBlogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
           if(err){
               req.flash("error", "Something Bad Happened!")
               res.redirect("back");
           }else{
                //does the user own the campground
                if(foundBlog.author.id.equals(req.user._id) || req.user.isAdmin)
                {
                    next();
                }else{
                    req.flash("error", "Permission Denied! Wrong User.")
                    res.redirect("back");
                }
                
           }
        });
    }
        else{
            res.redirect("back");
    }
}

module.exports = middlewareObj;