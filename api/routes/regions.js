const express = require('express');
const router = express.Router();
const mysql = require('mysql') // mysql db package
const checkAuth = require('../middleware/check-auth')
const regionController = require('../controllers/regions')

router.get('/', checkAuth, regionController.getallregions); //get regions
router.post('/setregion', checkAuth, regionController.setregion); //set regions



module.exports = router;