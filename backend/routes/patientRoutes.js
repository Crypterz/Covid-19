const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('./../controllers/authController')
const medicalHistoryController = require('../controllers/medicalHistoryController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, /*authController.restrictTo('patient','admin'),*/ patientController.getAllPatients)
  .get(patientController.getAllPatients)
  .post(patientController.createPatient)

router
  .route('/:id')
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient)

router
  .route('/:id/history')
  // .get(medicalHistoryController)
  .post(authController.protect,medicalHistoryController.createMedical)
  // .patch(medicalHistoryController)

module.exports = router;