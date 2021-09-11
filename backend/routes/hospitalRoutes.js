const express = require('express');
const hospitalController = require('../controllers/hospitalController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  .get(authController.protect, authController.restrictTo('patient'), hospitalController.getAllHospitals)
  .post(hospitalController.createHospital)

// router
//   .route('/:id')
//   .get(adminController.getPatient)
//   .patch(adminController.updatePatient)
//   .delete(adminController.deletePatient)

module.exports = router;
