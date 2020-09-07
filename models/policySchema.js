var mongoose = require("monogose");

var policySchema = new mongoose.Schema({
    relTo: String,
    polHead: String,
    polDesc: String,
    polRef: [{type:String}]
});

module.exports = mongoose.model("Policy", policySchema);