import { check } from 'express-validator';
import { authorizeAdmin } from '../middlewares/admin';

module.exports = [
  authorizeAdmin,
  check('name')
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage('A név legalább 3 karakter hosszú kell legyen.'),
  check('capacity')
    .not()
    .isEmpty()
    .withMessage('A kapacitás megadása kötelező.'),
  check('capacity')
    .isNumeric()
    .withMessage('A kapacitásnak számnak kell lennie.'),
  check('capacity')
    .isInt({ min: 1 })
    .withMessage('A kapacitásnak pozitív egész számnak kell lennie.'),
  check('isAvailable')
    .not()
    .isEmpty()
    .withMessage('Az elérhetőség megadása kötelező.'),
  check('isAvailable')
    .isBoolean()
    .withMessage('Az elérhetőségnek logikai értéknek kell lennie.'),
];
