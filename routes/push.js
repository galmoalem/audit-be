const express = require('express');
const router = express.Router()

const pushCon = require('../controllers/push-controller');



router.get('/allPush',pushCon.getPushes)

module.exports = router ;