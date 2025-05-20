import { getRepository, Repository } from 'typeorm';
import { Controller } from './base.controller';
import { Partner } from '../entity/Partner';

export class PartnerController extends Controller {
  repository: Repository<Partner> = getRepository('Partner');

  getFullJoined = async (req, res, next) => {
    try {
      const partnerId = req.params.id;

      let query = this.repository
        .createQueryBuilder('partner')
        .where('partner.id = :id', { id: partnerId })
        .leftJoinAndSelect('partner.foods', 'foods');

      const partialResult = await query.getMany();

      if (!partialResult || partialResult.length === 0) {
        return res
          .status(404)
          .json({ message: 'Nem található partner a megadott azonosítóval.' });
      }

      if (partialResult[0].foods.length > 0) {
        query = query
          .leftJoinAndSelect('foods.orderToFoods', 'orderToFoods')
          .leftJoinAndSelect('orderToFoods.order', 'order');
      }

      const fullResult = await query.getOne();

      res.json(fullResult);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Hiba történt a lekérdezés során.' });
    }
  };
}
