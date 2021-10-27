const express = require('express');
const hospitalController = require('../controllers/dashBoardController');
const authController = require('./../controllers/authController')
const hospitalRecordController = require('../controllers/hospitalRecordController');
const dashBoardController = require('../controllers/dashBoardController');

const router = express.Router();

router
  .route('/1')
  .get(hospitalRecordController.refreshDashBoard)

router.get('/publicdashboard',dashBoardController.publicDashBoard)

module.exports = router;
