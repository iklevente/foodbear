import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderToFood } from './OrderToFood';
import { Partner } from './Partner';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column('text')
  description: string;
  @Column('text')
  imageUrl: string;
  @ManyToOne((type) => Partner, (partner) => partner.foods, {})
  partner: Partner;

  @OneToMany((type) => OrderToFood, (orderToFood) => orderToFood.food)
  orderToFoods: OrderToFood[];
}
