var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
   location: String,
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
   mail: String
});

module.exports = mongoose.model("Job", jobSchema);