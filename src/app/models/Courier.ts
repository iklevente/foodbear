import { Order } from "./Order";

export class Courier{
    
    id!:number;
    
    name!:string;
    
    capacity!:number;
    
    isAvailable!:boolean;
    
    orders!:Order[];
}