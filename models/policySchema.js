var mongoose = require("mongoose");

var policySchema = new mongoose.Schema({
    relTo: String,
    polHead: String,
    polDesc: String,
    createdAt:{type:Date, default:Date.now},
});

module.exports = mongoose.model("Policy", policySchema);