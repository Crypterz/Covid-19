const express = require('express');
const hospitalController = require('../controllers/hospitalController');
const authController = require('./../controllers/authController')
const patientController = require('../controllers/patientController');

const router = express.Router();

router
  .route('/')
  //.get(authController.protect, authController.restrictTo('patient'), hospitalController.getAllHospitals)
  .get( hospitalController.getAllHospitals)
  .post(hospitalController.createHospital)

router
  .route('/ward')
  .post(authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.createWard)
<<<<<<< HEAD
  //.patch(authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.updateWard)
=======

router
  .route('/ward/:wardID')
  .patch(authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.updateWard)  
  // .patch(authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.updateWard)
>>>>>>> 0016c00ae587edb728171134e91acb58d0e3ab5e
  // .patch(adminController.updatePatient)
  // .delete(adminController.deletePatient)
router.get('/details',authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.getHospitalDetails)
router.get('/admitted', authController.protect, authController.restrictTo('hospitalAdmin'), patientController.getAdmittedPatients)
router.patch('/ward/:wardId',authController.protect, authController.restrictTo('hospitalAdmin'), hospitalController.updateWard)


module.exports = router;
