const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/racer', require('./racer'));

module.exports = router;
