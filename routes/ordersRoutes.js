const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')

const orderController = require('../controllers/orderController')

router.get('/', orderController.getAllOrders) 
router.get('/:id', orderController.getOrderById)
router.post('/', auth, orderController.createOrder)
router.put('/:id', auth, orderController.updateOrder)
router.delete('/:id', auth, orderController.deleteOrder)


module.exports = router;