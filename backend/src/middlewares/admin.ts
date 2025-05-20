import { User } from '../entity/User';
import { secret } from '../secret';

const jwt = require('jsonwebtoken');

export function authorizeAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret);
    const decodeToken = jwt.decode(token, secret);
    req.user = new User();
    req.user.id = decodeToken.id;
    req.user.isAdmin = decodeToken.isAdmin;
    if (decodeToken.isAdmin == true) {
      next();
    } else {
      res.status(401).json({ message: 'Nem admin' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: 'Nem adott meg tokent' });
  }
}
