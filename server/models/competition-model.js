/* globals module require */
"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constants = require("../utilities/constants");
const Status = constants.competitionStatus;

const competitionSchema = new Schema({
    name: { type: String, require: true },
    place: { type: String, required: true },
    likes: { type: Number, required: true },
    organizator: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    joinedUsers: {
        type: [{
            username: { type: String, required: true },
            attended: { type: String, required: true }
        }]
    },
    points: { type: Number, required: true },
    level: { type: String, required: true },
    keys: [String],
    location: {
        latitude: { type: String },
        longitute: { type: String }
    },
    passed: { enum: Status, required: true }
});

mongoose.model("Competition", competitionSchema);
module.exports = mongoose.model("Competition");