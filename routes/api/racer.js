const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Racer = mongoose.model('Racer');

// POST new racer
router.post('/', auth.required, (req, res, next) => {
  const { body: { racer } } = req;

    if (!racer.discordHandle) {
      return res.status(422).json({
        errors: {
          discordHandle: 'is required',
        },
      });
    }

    if (!racer.displayName) {
      return res.status(422).json({
        errors: {
          displayName: 'is required',
        },
      });
    }

    const finalRacer = new Racer(racer);
    return finalRacer.save()
      .then(() => res.json({ racer: finalRacer }));
});

// get all racers
router.get('/', auth.required, (req, res, next) => {
  Racer.find((err, racers) => {
    if (err) console.error(err);
    res.send(racers);
  });
});

// get one racer
router.get('/:id', auth.required, (req, res, next) => {
  Racer.findById(req.params.id, (err, racer) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(racer);
  });
});

// remove a racer
router.delete('/:id', auth.required, (req, res, next) => {
  Racer.findByIdAndRemove(req.params.id, (err, racer) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(racer);
  });
});

router.post('/time', auth.required, (req, res, next) => {
  const { body: { time, racer } } = req;

  if (!time.gameName) {
    return res.status(422).json({
      errors: {
        gameName: 'is required',
      },
    });
  }

  if (!time.time) {
    return res.status(422).json({
      errors: {
        time: 'is required',
      },
    });
  }

  Racer.findOneAndUpdate(racer, { $push: { times: time } }, (err, newRacer) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newRacer);
  });
});

router.get('/:id/time', auth.required, (req, res, next) => {
  Racer.findById(req.params.id, (err, racer) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(racer.times);
  });
});

// const express = require("express");
// const mongoose = require("mongoose");
//
// let Racer = require("../models/racer");
//
// let racerRoute = express();
//
// racerRoute.route("/")
//     .get((req, res) => {
//         Racer.find((err, racers) => {
//             if (err) console.error(err);
//             res.send(racers);
//         });
//     })
//     .post((req, res) => {
//         let newRacer = new Racer(req.body);
//         newRacer.save((err, test) => {
//             if (err) console.error(err);
//             res.send(newRacer);
//         })
//     });
// racerRoute.route("/:id")
//     .delete((req, res) => {
//         Racer.findByIdAndRemove(req.params.id, (err, racer) => {
//             if (err) return res.status(500).send(err);
//             return res.status(200).send(racer);
//         });
//     });

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

module.exports = router;
