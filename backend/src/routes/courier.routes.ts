import { CourierController } from '../controller/courier.controller';
import * as express from 'express';
import { authorizeAdmin } from '../middlewares/admin';
import { authorize } from '../middlewares/auth';

const courierValidator = require('../validator/courierValidator');

export function getCourierRoutes() {
  const router = express.Router();

  const courierController = new CourierController();

  router.get('/api/courier', authorize, courierController.getAll);
  router.post('/api/createcourier', courierValidator, courierController.create);
  router.get('/api/courier/:id', authorize, courierController.getOne);
  router.delete('/api/courier/:id', authorizeAdmin, courierController.delete);
  router.put('/api/courier/:id', courierValidator, courierController.update);

  return router;
}
