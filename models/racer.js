const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RacerSchema = mongoose.Schema({
    discordHandle: {type: String, required: true},
    displayName: {type: String, required: true},
    pronouns: {type: String, default: "they/them"},
    teamName: String,
    times: [{
      gameName: String,
      time: Number,
      points: Number,
    }],
});

module.exports = mongoose.model("Racer", RacerSchema);
