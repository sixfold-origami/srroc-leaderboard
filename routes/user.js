const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");

let userRoute = express();

userRoute.route("/")
    .get((req, res) => {
        User.find((err, users) => {
            if (err) console.error(err);
            res.send(users);
        });
    })
    .post((req, res) => {
        let newUser = new User(req.body);
        newUser.save((err, test) => {
            if (err) console.error(err);
            res.send(newUser);
        })
    });

userRoute.route("/:id")
    .delete((req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        });
    });

module.exports = userRoute;
