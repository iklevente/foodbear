import { check } from 'express-validator';
import { authorize } from '../middlewares/auth';

module.exports = [
  authorize,
  check('address').not().isEmpty().withMessage('A cím megadása kötelező'),
  check('address')
    .isLength({ min: 5 })
    .withMessage('A címnek legalább 5 karakter hosszúnak kell lennie'),
  check('name').not().isEmpty().withMessage('A név megadása kötelező'),
];
