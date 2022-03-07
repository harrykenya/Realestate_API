const express = require('express');
const router = express.Router();

const RealtorController = require ('../controllers/realtor')
const checkAuth = require('../middleware/check-auth')

router.post('/signup',RealtorController.realtor_signup);

router.post('/login',RealtorController.realtor_login);

router.delete('/:realtorId',checkAuth, RealtorController.realtor_delete)

module.exports = router