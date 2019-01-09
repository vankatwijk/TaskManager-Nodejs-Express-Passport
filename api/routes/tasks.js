const express = require('express');
const router = express.Router();
const mysql = require('mysql') // mysql db package
const checkAuth = require('../middleware/check-auth')
const roleController = require('../controllers/roles')

router.get('/', checkAuth, roleController.getallroles); //get regions
router.post('/setrole', checkAuth, roleController.setrole); //set regions



module.exports = router;
