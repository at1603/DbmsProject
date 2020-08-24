var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var employerSchema = new mongoose.Schema({
   firstName: String,
   lastName: String, 
   username: String,
   password: String,
   email:String,
   avatar:String,
   address:String,
   state: String,
   city: String
});

employerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Employer", employerSchema);