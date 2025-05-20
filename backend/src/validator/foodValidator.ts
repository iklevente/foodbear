import { check } from 'express-validator';
import { authorizeAdmin } from '../middlewares/admin';

module.exports = [
  authorizeAdmin,
  check('name')
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage('A név legalább 3 karakter hosszú kell legyen'),
  check('price')
    .not()
    .isEmpty()
    .withMessage('Az ár megadása kötelező')
    .isFloat({ min: 0 })
    .withMessage('Az ár nem lehet negatív szám'),
  check('imageUrl')
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage('Az kép URL-nek érvényes URL-nek kell lennie'),
];
