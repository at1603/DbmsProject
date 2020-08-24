var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var employeeSchema = new mongoose.Schema({
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

employeeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Employee", employeeSchema);