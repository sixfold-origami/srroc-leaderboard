const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    salt: {type: String, required: true},
    saltedHash: {type: String, required: true},
});

module.exports = mongoose.model("User", UserSchema);
