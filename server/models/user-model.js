/* globals module require */
"use strict"

const mongoose = require("mongoose");
const encrypt = require("../utilities/encryptor");
const Schema = mongoose.Schema;

const progressbarSchema = require("./progressbar-model");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        match: /^[A-Z]([a-z]?)+$/,
        required: true
    },
    lastName: {
        type: String,
        match: /^[A-Z]([a-z]?)+$/,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        Type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    competitions: [{
        // TODO: decide on information
    }],
    progress: {
        type: progressbarSchema
    }
});

userSchema.methods = {
    isValidPassword(password) {
        let realPassHash = this.passHash;
        let currentPassHash = encryption.getPassHash(this.salt, password);
        if (currentPassHash === realPassHash) {
            return true;
        } else {
            return false;
        }
    }
};

const User = mongoose.model("User", userSchema);

//TODO: add function to find specific user => admin

module.exports = mongoose.model("User");