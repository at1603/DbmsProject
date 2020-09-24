var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
   location: String,
   vacancy: Number,
   Salary: String,
   ToJob: String,
   skill: [String],
   Qual: [String],
   handler:{
      id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
   }
   
});

module.exports = mongoose.model("Job", jobSchema);