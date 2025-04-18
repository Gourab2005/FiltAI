const express = require('express');
const { signup } = require('../Controllers/signup');
const { login } = require('../Controllers/login');
const { AuthValidator } = require('../Middlewares/AuthValidator');
const profile = require('../Controllers/profile');
const { addHospital } = require('../Controllers/hospital');
const { addDoctor } = require('../Controllers/doctor');
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/profile',AuthValidator,profile);
router.post('/addHospital',AuthValidator,addHospital);
router.post('/addDoctor',AuthValidator,addDoctor);

module.exports = router;