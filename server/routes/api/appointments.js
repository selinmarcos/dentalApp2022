const express = require('express');
const router = express.Router();
const appointmentsController = require('../../controllers/appointmentsController')

router.route('/')
    .post(appointmentsController.createAppointment)
    .get(appointmentsController.getAllAppointments)
router.route('/:id')
     .put(appointmentsController.updateAppointment)
//     .get(appointmentsController.getPatient)
    .delete(appointmentsController.deleteAppointment)   

module.exports = router;    