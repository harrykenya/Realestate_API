const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');
 
//Handle incoming GET requests
router.get('/', checkAuth,OrdersController.orders_get_all);

//handle incoming POST request to /orders
router.post('/', checkAuth,OrdersController.orders_create_order);

//handle incoming GET request to /orders
router.get('/:orderId', checkAuth,OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth,OrdersController.orders_delete_orders);

module.exports = router