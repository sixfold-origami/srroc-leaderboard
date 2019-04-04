const express = require("express");
const mongoose = require("mongoose");

let Racer = require("../models/racer");

let racerRoute = express();

racerRoute.route("/")
    .get((req, res) => {
        Racer.find((err, racers) => {
            if (err) console.error(err);
            res.send(racers);
        });
    })
    .post((req, res) => {
        let newRacer = new Racer(req.body);
        newRacer.save((err, test) => {
            if (err) console.error(err);
            res.send(newRacer);
        })
    });
racerRoute.route("/:id")
    .delete((req, res) => {
        Racer.findByIdAndRemove(req.params.id, (err, racer) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(racer);
        });
    });

// racerRoute.route("/:id/comments")
//     .get((req, res) => {
//         Comment.find({ tweet: req.params.id }, (err, comments) => {
//             if (err) return res.status(500).send(err);
//             return res.status(200).send(comments);
//         })
//     })
//     .post((req, res) => {
//         let newComment = new Comment(req.body);
//         newComment.tweet = req.params.id;
//         newComment.save((err, savedComment) => {
//             if (err) return res.status(500).send(err);
//             return res.status(200).send(savedComment);
//         });
//     });

module.exports = racerRoute;
