const express = require('express');
const router = express.Router();

const RealtorController = require ('../controllers/realtors')
const checkAuth = require('../middleware/check-auth')

router.get('/',RealtorController.realtors_get_all);

router.post('/signup',RealtorController.realtor_signup);

router.post('/login',RealtorController.realtor_login);

router.post('/:realtorId',RealtorController.realtors_update_realtor);

router.get('/:realtorId',RealtorController.realtors_get_realtor);

router.delete('/:realtorId',checkAuth, RealtorController.realtor_delete)

module.exports = router