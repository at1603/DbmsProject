var middlewareObj = {};
var Blog = require('../models/blogSchema');
var User = require('../models/userSchema'); 

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/userLogin");
}

module.exports = middlewareObj;