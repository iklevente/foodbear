import { getRepository, Repository } from 'typeorm';
import { Controller } from './base.controller';
import { Food } from '../entity/Food';

export class FoodController extends Controller {
  repository: Repository<Food> = getRepository('Food');

  getOne = async (req, res) => {
    const entityId = req.params.id;

    try {
      const entity = await this.repository
        .createQueryBuilder('food')
        .where('food.id = :id', { id: entityId })
        .leftJoinAndSelect('food.partner', 'partner')
        .leftJoinAndSelect('food.orderToFoods', 'orderToFoods')
        .leftJoinAndSelect('orderToFoods.order', 'order')
        .getOne();

      if (!entity) {
        return res.status(404).json({ message: 'Nem található az étel.' });
      }

      res.json(entity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const entities = await this.repository
        .createQueryBuilder('food')
        .leftJoinAndSelect('food.partner', 'partner')
        .leftJoinAndSelect('food.orderToFoods', 'orderToFoods')
        .leftJoinAndSelect('orderToFoods.order', 'order')
        .getMany();
      res.json(entities);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}
