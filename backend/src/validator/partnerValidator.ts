import { check } from 'express-validator';
import { authorizeAdmin } from '../middlewares/admin';

module.exports = [
  authorizeAdmin,
  check('name')
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage('A név legalább 3 karakter hosszú legyen'),
  check('tel').not().isEmpty().withMessage('A telefonszám megadása kötelező'),
  check('tel')
    .isMobilePhone('hu-HU')
    .withMessage('A telefonszám érvényes magyar szám legyen'),
  check('taxNumber')
    .not()
    .isEmpty()
    .withMessage('Az adószám megadása kötelező'),
  check('taxNumber')
    .isNumeric()
    .withMessage('Az adószám csak számokat tartalmazhat'),
  check('taxNumber')
    .isLength({ min: 11, max: 11 })
    .withMessage('Az adószám pontosan 11 számjegy legyen'),
  check('address').not().isEmpty().withMessage('A cím megadása kötelező'),
  check('address')
    .isLength({ min: 5 })
    .withMessage('A cím legalább 5 karakter hosszú legyen'),
];
