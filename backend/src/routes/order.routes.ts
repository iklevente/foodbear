import { OrderController } from '../controller/order.controller';
import * as express from 'express';
import { authorizeAdmin } from '../middlewares/admin';
import { authorize } from '../middlewares/auth';
import { check, param, query } from 'express-validator';

const orderValidator = require('../validator/orderValidator');

export function getOrderRoutes() {
  const router = express.Router();

  const orderController = new OrderController();

  router.get('/api/order', authorize, orderController.getAll);
  router.post('/api/createorder', orderValidator, orderController.create);
  router.get('/api/order/:id', authorize, orderController.getOne);
  router.delete('/api/order/:id', authorize, orderController.delete);
  router.put('/api/order/:id', orderValidator, orderController.update);
  router.get(
    '/api/order/partner/:id',
    authorize,
    orderController.getOrdersByPartnerId
  );
  router.get(
    '/api/order/food/:id',
    authorize,
    orderController.getOrderByFoodId
  );
  router.get('/api/order/:id/deliver', authorize, orderController.deliver);

  return router;
}
