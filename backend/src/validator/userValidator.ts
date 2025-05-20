import { check } from 'express-validator';
import { authorizeAdmin } from '../middlewares/admin';

module.exports = [
  authorizeAdmin,
  check('name')
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage('A név legalább 3 karakter hosszú legyen'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Az email cím megadása kötelező')
    .isEmail()
    .withMessage('Az email cím érvényes legyen'),
  check('isAdmin')
    .isBoolean()
    .withMessage('Az isAdmin mezőnek logikai értéknek kell lennie'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('A jelszó megadása kötelező')
    .isLength({ min: 8 })
    .withMessage('A jelszó legalább 8 karakter hosszú legyen'),
];
