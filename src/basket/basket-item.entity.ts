import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from "typeorm";
import { Basket } from "./basket.entity";

@Entity()
export class BasketItem extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 50,
    })
    name: string;

    @ManyToMany(type => Basket, entity => entity.items)
    @JoinTable()
    baskets: Basket[];
}
