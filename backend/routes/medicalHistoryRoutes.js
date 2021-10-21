const express = require('express');
const medicalHistoryController = require('../controllers/medicalHistoryController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  .post(medicalHistoryController.createMedical)

router
  .route('/:id')
  .get(medicalHistoryController.getMedicalHistory)
  // .patch(medicalHistoryController.addSymtomsDrugs)

  router.patch('/:id/adddrugs',medicalHistoryController.addDrugs)
  router.patch('/:id/addsymptoms',medicalHistoryController.addSymptoms)

module.exports = router;