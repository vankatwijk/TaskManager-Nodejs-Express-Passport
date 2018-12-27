const express = require('express');
const router = express.Router();
const userController = require('../controllers/traders');
const checkAuth = require('../middleware/check-auth');


//router.get('/',userController.default);
router.get('/',checkAuth,userController.getuserinfo);
router.post('/signup',userController.signup);
router.post('/login',userController.login);



module.exports = router;
