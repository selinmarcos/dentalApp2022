const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/inventoryController')

router.route('/')
    .post(inventoryController.createInventory)
    .get(inventoryController.getAllInventory)
router.route('/:id')
    .put(inventoryController.updateInventory)
    // .get(patienController.getPatient)
    .delete(inventoryController.deleteInventory)   

module.exports = router;    