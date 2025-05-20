import { FoodController } from '../controller/food.controller';
import * as express from 'express';
import { authorizeAdmin } from '../middlewares/admin';
import { authorize } from '../middlewares/auth';

const foodValidator = require('../validator/foodValidator');

export function getFoodRoutes() {
  const router = express.Router();

  const foodController = new FoodController();

  router.get('/api/food', authorize, foodController.getAll);
  router.post('/api/createfood', foodValidator, foodController.create);
  router.get('/api/food/:id', authorize, foodController.getOne);
  router.delete('/api/food/:id', authorizeAdmin, foodController.delete);
  router.put('/api/food/:id', foodValidator, foodController.update);

  return router;
}
