const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;

// const express = require("express");
// const mongoose = require("mongoose");
//
// const User = require("../models/user");
//
// let userRoute = express();
//
// userRoute.route("/")
//     .get((req, res) => {
//         User.find((err, users) => {
//             if (err) console.error(err);
//             res.send(users);
//         });
//     })
//     .post((req, res) => {
//         let newUser = new User(req.body);
//         newUser.save((err, test) => {
//             if (err) console.error(err);
//             res.send(newUser);
//         })
//     });
//
// userRoute.route("/:id")
//     .delete((req, res) => {
//         User.findByIdAndRemove(req.params.id, (err, user) => {
//             if (err) return res.status(500).send(err);
//             return res.status(200).send(user);
//         });
//     });
//
// module.exports = userRoute;
