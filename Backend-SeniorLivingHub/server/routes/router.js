const express = require('express');
const route = express.Router()
const useResident = require('../Resident CRUD/residentsController')
const useMedicalstaff = require('../Resident CRUD/medicalStaffController')

const loginController = require('../controller/loginController');
const signupController = require('../controller/signupController')

route.post('/users/login', loginController.login);
route.post('/users/signup', signupController.signup);

// Resident
route.get('/resident', useResident.find);
route.put('/resident',useResident.update);
route.delete('/resident',useResident.delete);

//Medical Staff
route.get('/medicalstaff', useMedicalstaff.find);
route.put('/medicalstaff',useMedicalstaff.update);
route.delete('/medicalstaff',useMedicalstaff.delete);

module.exports = route