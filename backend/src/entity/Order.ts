import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Courier } from "./Courier";
import { Food } from "./Food";
import { OrderToFood } from "./OrderToFood";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @CreateDateColumn()
    orderTime:Date;
    @Column({type:"datetime", nullable:true})
    deliveryTime:Date;
    @Column()
    address:string;
    @Column()
    note:string;
  
    @ManyToOne(type => Courier, courier => courier.orders)
    courier:Courier;
    @OneToMany(type => OrderToFood, orderToFood => orderToFood.order, {
        cascade: true,
    })
    orderToFoods: OrderToFood[];
    @Column({default:false})
    delivered:boolean;
}