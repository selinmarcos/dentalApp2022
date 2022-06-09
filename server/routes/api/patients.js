const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/patientsController')

router.route('/')
    .post(patientController.createPatient)
    .get(patientController.getAllPatients)
router.route('/:id')
    .put(patientController.updatePatient)
    .get(patientController.getPatient)
    .delete(patientController.deletePatient)   

module.exports = router;    