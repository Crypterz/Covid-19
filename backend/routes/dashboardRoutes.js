const express = require('express');
const hospitalController = require('../controllers/dashBoardController');
const authController = require('./../controllers/authController')
const dashBoardController = require('../controllers/hospitalRecordController');

const router = express.Router();

router
  .route('/1')
  .get(dashBoardController.refreshDashBoard)

module.exports = router;
