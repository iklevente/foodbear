import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./Food";

@Entity()
export class Partner{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    name:string;
    @Column()
    tel:string;
    @Column({unique:true})
    taxNumber:string;
    @Column()
    address:string;
    @OneToMany(type => Food, food => food.partner,{
        eager: true,
        cascade: true,
    })
    foods:Food[];
}