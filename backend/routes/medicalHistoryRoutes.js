const express = require('express');
const medicalHistoryController = require('../controllers/medicalHistoryController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  .post(authController.protect, authController.restrictTo('hospitalAdmin'), medicalHistoryController.createMedical)
  .get(authController.protect, authController.restrictTo('hospitalAdmin','patient'), medicalHistoryController.getAllMedicalHistory)

router
  .route('/:id')
  .get(authController.protect, authController.restrictTo('hospitalAdmin'), medicalHistoryController.getMedicalHistory)
  // .patch(medicalHistoryController.addSymtomsDrugs)

  router.post('/:patientID/changehospitalrequest',medicalHistoryController.changeHospital)
  router.post('/:patientID/changeward',medicalHistoryController.changeWard)
  router.get('/:medID/changehospital-accept',medicalHistoryController.changeHospital_accept)
  router.get('/:medID/changehospital-decline',medicalHistoryController.changeHospital_decline)

  router.get('/changehospital/pending',medicalHistoryController.changeHospital_GetPending)

  router.patch('/:id/adddrugs',authController.protect, authController.restrictTo('hospitalAdmin'),medicalHistoryController.addDrugs)
  router.patch('/:id/addsymptoms',authController.protect, authController.restrictTo('hospitalAdmin'),medicalHistoryController.addSymptoms)

module.exports = router;