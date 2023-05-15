// setting up the routes 

const express = require('express');
const router = express.Router();


// require home controller
const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);

// setting up the other routes
router.use('/users',require('./user'));






module.exports = router;