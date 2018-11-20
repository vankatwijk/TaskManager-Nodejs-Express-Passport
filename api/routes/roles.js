const express = require('express');
const router = express.Router();
const mysql = require('mysql')// mysql db package
const checkAuth = require('../middleware/check-auth')
const userController = require('../controllers/roles')

router.get('/',checkAuth,userController.default);



module.exports = router;
