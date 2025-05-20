import { AuthController } from '../controller/auth.controller';
import * as express from 'express';
import { check } from 'express-validator';
import { authorizeAdmin } from '../middlewares/admin';
import { authorize } from '../middlewares/auth';

const userValidator = require('../validator/userValidator');

export function getAuthRoutes() {
  const router = express.Router();

  const authController = new AuthController();

  router.get('/api/users', authorizeAdmin, authController.getAll);
  router.post('/api/login', authController.login);
  router.post('/api/createuser', userValidator, authController.createUser);
  router.get('/api/user', authorize, authController.getOne);
  router.get('/api/user/isadmin', authorizeAdmin, authController.isAdmin);
  router.delete('/api/users/:id', authorizeAdmin, authController.delete);
  router.get('/api/token', authorize, async (req, res) => {
    res.status(200).json(true);
  });

  return router;
}
