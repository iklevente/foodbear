import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { validationResult } from 'express-validator';
import { Controller } from './base.controller';
import { secret } from '../secret';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class AuthController extends Controller {
  repository = getRepository(User);

  login = async (req, res, next) => {
    const email = req.body.email;
    try {
      const user = await this.repository.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({
          message: 'Érvénytelen e-mail vagy jelszó',
        });
      }
      const isMatching = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatching) {
        return res.status(401).json({
          message: 'Érvénytelen e-mail vagy jelszó',
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        {
          expiresIn: '1h',
        }
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        id: user.id,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  createUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);
      await this.create(req, res);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  isAdmin = async (req, res, next) => {
    res.status(200).json(true);
  };

  getOne = async (req, res) => {
    let entityId;
    if (req.params.id) {
      entityId = req.params.id;
    } else {
      entityId = req.user.id;
    }
    try {
      const entity = await this.repository.findOne(entityId);
      entity.password = '';

      if (!entity) {
        return res.status(404).json({ message: 'Nem található az entitás.' });
      }

      res.json(entity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req, res) => {
    let entityId;
    if (req.params.id) {
      entityId = req.params.id;
    } else {
      entityId = req.user.id;
    }

    try {
      const entity = await this.repository.findOne(entityId);
      if (!entity) {
        return res.status(404).json({ message: 'Nem létező entitás.' });
      }

      await this.repository.delete(entity);
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };
}
