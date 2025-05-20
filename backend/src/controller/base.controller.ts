import { validationResult } from 'express-validator';
import { ILike, Repository } from 'typeorm';

export class Controller {
  repository: Repository<any>;

  create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const body = req.body;
    const entity = this.repository.create(body);

    try {
      const createdEntity = await this.repository.save(entity);
      res.json(createdEntity);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  getAll = async (req, res) => {
    try {
      const entities = await this.repository.find();
      res.json(entities);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  getOne = async (req, res) => {
    const entityId = req.params.id;

    try {
      const entity = await this.repository.findOne(entityId);

      if (!entity) {
        return res.status(404).json({ message: 'Nem található az entitás.' });
      }

      res.json(entity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const entity = this.repository.create(req.body as {});

    try {
      const existingEntity = await this.repository.findOne(entity.id);
      if (!existingEntity) {
        return res.status(404).json({ message: 'Nem létező entitás.' });
      }

      const modifiedEntity = await this.repository.save(entity);
      res.json(modifiedEntity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req, res) => {
    let entityId = req.params.id;

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

  search = async (req, res) => {
    try {
      const searchTerm = req.params.search;
      const entities = await this.repository.find({
        where: {
          name: ILike(`${searchTerm}`),
        },
      });
      res.status(200).json(entities);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
