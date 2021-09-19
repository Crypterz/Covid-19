const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  .get(authController.protect, authController.restrictTo('patient','admin'), patientController.getAllPatients)
  .post(patientController.createPatient)

router
  .route('/:id')
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient)

module.exports = router;