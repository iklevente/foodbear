import { getRepository, Repository } from 'typeorm';
import { Controller } from './base.controller';
import { Courier } from '../entity/Courier';

export class CourierController extends Controller {
  repository: Repository<Courier> = getRepository('Courier');

  getOne = async (req, res) => {
    const entityId = req.params.id;

    try {
      const entity = await this.repository
        .createQueryBuilder('courier')
        .where('courier.id = :id', { id: entityId })
        .leftJoinAndSelect('courier.orders', 'orders')
        .leftJoinAndSelect('orders.orderToFoods', 'orderToFoods')
        .leftJoinAndSelect('orderToFoods.food', 'foods')
        .addSelect(['foods.id', 'foods.name', 'foods.partner', 'foods.price'])
        .leftJoin('foods.partner', 'partner')
        .addSelect(['partner.name', 'partner.id'])
        .getOne();

      if (!entity) {
        return res.status(404).json({ message: 'Nem található az entitás.' });
      }

      res.json(entity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const entities = await this.repository
        .createQueryBuilder('courier')
        .leftJoinAndSelect('courier.orders', 'orders')
        .getMany();
      res.json(entities);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}
