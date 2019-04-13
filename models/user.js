const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

let UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60); // is this 60 minutes? guide is unclear but i assume it is

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model("User", UserSchema);
