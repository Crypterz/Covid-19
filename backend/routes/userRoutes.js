const express =require('express');

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router= express.Router()

router.get('/',userController.getAllUsers)
router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.post('/forgotpassword',authController.forgotPassword)
router.patch('/resetpassword/:token',authController.resetPassword)
module.exports = router;
