var mongoose = require("mongoose");

var employerSchema = new mongoose.Schema({
    companyName:String,
    companyAddress:{
        streetAddress:String,
        city:String,
        state:String,
        zip:String,
    },
    designation:String,
    grad:String,
    gradCol:String,
    pgrad:String,
    pgradCol:String,
    description:String,
    handler:{
      id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
   }
});

module.exports = mongoose.model("Employer", employerSchema);