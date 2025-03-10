const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController')
const auth = require("../middleware/authMiddleware");


router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/',auth, customerController.createCustomer);
router.put('/:id',auth, customerController.updateCustomer);
router.delete('/:id',auth, customerController.deleteCustomer);


module.exports = router;