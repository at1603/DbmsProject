var mongoose = require("mongoose");
    
var blogSchema = new mongoose.Schema({
   title:String,
   image:String,
   description:String
});

module.exports = mongoose.model("Blog", blogSchema);