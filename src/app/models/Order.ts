import { Courier } from "./Courier";
import { Food } from "./Food";


export class Order{
    id!:number;
    address!:string;
    name!:string;
    orderTime!:Date;
    deliveryTime!:Date;
    note!:string;
    orderToFoods!:{
        food:Food;
        amount:number;
    }[];
    courier!:Courier;
    delivered!:boolean;
}