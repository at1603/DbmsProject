var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
   state: String,
   city: String,
   vacancy: Number,
   salary: String,
   ToJob: String,
   skill: [String],
   qual: [String],
   handler:{
      id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
   },
   lastApply: String,
   contact: String,
   mail: String,
   title: String,
   about: String,
   description: String
});

module.exports = mongoose.model("Job", jobSchema);