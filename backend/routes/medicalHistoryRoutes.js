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

  router.patch('/:id/adddrugs',medicalHistoryController.addDrugs)
  router.patch('/:id/addsymptoms',medicalHistoryController.addSymptoms)

module.exports = router;