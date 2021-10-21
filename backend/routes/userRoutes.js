const express =require('express');

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router= express.Router()

<<<<<<< HEAD
// router.get('/',userController.getAllUsers)
// router.post('/signup',authController.signup)
router.post('/login',authController.login)
// router.post('/forgotpassword',authController.forgotPassword)
// router.patch('/resetpassword/:token',authController.resetPassword)
// module.exports = router;
=======
router.get('/',authController.protect, userController.getAllUsers)
router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.post('/forgotpassword',authController.forgotPassword)
router.patch('/resetpassword/:token',authController.resetPassword)
module.exports = router;
>>>>>>> 78d5d015b5454e998694a009cfc9cb81a63ce0e0

router
  .route('/')
  .get( userController.getAllUsers)
  .post(userController.createUser)

module.exports = router;
