var express = require("express"),
    router = express.Router();
var Blog = require("../models/blogSchema"),
    middleware = require('../middleware');


router.get("/blogs", function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        }else{
            res.render("blog/index", {blogs:allBlogs}); 
        }
    });
    
});

router.post("/blogs", middleware.isLoggedIn, function(req,res){
    var title= req.body.title;
    var image= req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var genre=req.body.genre;
    var newBlog = {title:title, image: image, description:desc, author:author,genre:genre};
    Blog.create(newBlog, function(err, newlyCreated){
      if(err){
          console.log(err);
      }else{
            res.redirect("/blogs");
      }
    });
});
//new blog page
router.get("/blogs/new", middleware.isLoggedIn, function(req, res){
   res.render("blog/new"); 
});

router.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          console.log(err);
      } else{
          res.render("blog/show", {blog:foundBlog});
      }
  });
});

//edit page route
router.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("blogs/edit");
        }else{
            res.render("blog/edit", {blog:foundBlog});  
        }
    });
});

//update route
router.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/"+req.params.id);
       }
    });
 });

//delete route
router.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err,){
        if(err){
            res.redirect("/blogs");
        }else{
            // req.flash("success", "Campground Successfully Deleted");
            res.redirect("/blogs");
        }
    });
});

module.exports = router;