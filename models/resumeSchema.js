var mongoose = require("mongoose");

var resumeSchema = new mongoose.Schema({
    handler:{
      id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
   },
   proSum:String,
   empHis:[{type:String}],
   edu:[{type:String}],
   webLink:[{type:String}],
   skills:[{type:String}],
   lang:[{type:String}],
   intern:[{type:String}],
   exCurri:[{type:String}]
});


module.exports = mongoose.model("Resume", resumeSchema);