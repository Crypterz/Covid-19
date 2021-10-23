const express = require('express');
const hospitalController = require('../controllers/hospitalController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  //.get(authController.protect, authController.restrictTo('patient'), hospitalController.getAllHospitals)
  .get( hospitalController.getAllHospitals)
  .post(hospitalController.createHospital)

router
  .route('/ward')
  .post(authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.createWard)
  // .patch(authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.updateWard)
  // .patch(adminController.updatePatient)
  // .delete(adminController.deletePatient)

router.patch('/ward/:wardId',authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.updateWard)

module.exports = router;
