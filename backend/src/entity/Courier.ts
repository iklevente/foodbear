import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Courier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  capacity: number;
  @Column()
  isAvailable: boolean;
  @OneToMany((type) => Order, (order) => order.courier, {
    cascade: true,
  })
  orders: Order[];
}
