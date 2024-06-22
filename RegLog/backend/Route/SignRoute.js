const express = require('express');
const {CreateAccount,LoginCheck} = require('../Controller/RegController');
const router = express.Router();

router.post('/signup',CreateAccount);
router.post('/login',LoginCheck);
module.exports = router;