import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./Food";
import { Order } from "./Order";

@Entity()
export class OrderToFood{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    amount:number;
    @ManyToOne(type => Order, order => order.orderToFoods)
    order:Order;
    @ManyToOne(type => Food, food => food.orderToFoods)
    food:Food;
}