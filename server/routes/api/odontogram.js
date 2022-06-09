const express = require('express');
const router = express.Router();
const odontoController = require('../../controllers/odontoController')

router.route('/')
    .post(odontoController.createOdonto)
//     .get(patienController.getAllPatients)
// router.route('/:id')
//     .put(patienController.updatePatient)
//     .get(patienController.getPatient)
//     .delete(patienController.deletePatient)   

module.exports = router;    