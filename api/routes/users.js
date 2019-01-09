const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');


router.get('/', checkAuth, userController.getuserinfo);
router.get('/getuserinfo', checkAuth, userController.getuserinfo);//protected route
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/setrole', checkAuth, userController.setrole); //protected route
router.post('/getrole', checkAuth, userController.getrole); //protected route
router.patch('/updateuserinfo', checkAuth, userController.updateuserinfo); //protected route



module.exports = router;
