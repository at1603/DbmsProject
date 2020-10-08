var express = require("express"),
    router = express.Router();
var Policy = require("../models/policySchema"),
    middleware = require('../middleware');
const { route } = require("./blogRoutes");

//show index page
router.get('/policy', function(req,res){
    var admin = req.user.isAdmin;
    Policy.find({}, function(err, allPolicies){
        if(err){
            console.log(err);
        }else{
            res.render("policy/index", {policies:allPolicies, isAdmin: admin}); 
        }
    });
});

//show new policy page
router.get('/policy/new', function(req, res){
    res.render('policy/new');
});

router.post('/policy', function(req,res){
    var newPolicy = {
        polHead:req.body.polHead, 
        relTo: req.body.relTo, 
        polDesc:req.body.polDesc};
    Policy.create(newPolicy, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
                res.redirect("/policy");
        }
        });
});

//show policy page
router.get('/policy/:id/show', function(req, res){
    Policy.findById(req.params.id, function(err, foundPolicy){
        if(err){
            res.redirect("/policy/index");
        }else{
            res.render("policy/show", {policy:foundPolicy});  
        }
    });
});
//show edit page route
router.get('/policy/:id/edit', function(req, res){
    Policy.findById(req.params.id, function(err, foundPolicy){
        if(err){
            res.redirect("policy/edit");
        }else{
            res.render("policy/edit", {policy:foundPolicy});  
        }
    });
});

//update policy route
router.put('/policy/:id', function(req,res){
    Policy.findByIdAndUpdate(req.params.id, req.body.policy, function(err, updatePolicy){
        if(err){
            res.redirect("/policy");
        }else{
            res.redirect("/policy");
        }
     });
});

//delete policy route
router.delete('/policy/:id', function(req, res){
    Policy.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/policy");
        }else{
            res.redirect("/policy");
        }
    });
});

module.exports = router;