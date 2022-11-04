import { BaseEntity, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { BasketItem } from "./basket-item.entity";

@Entity()
export class Basket extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(type => User)
    user: User;

    @ManyToMany(type => BasketItem, entity => entity.baskets)
    @JoinTable()
    items: BasketItem[];
}
