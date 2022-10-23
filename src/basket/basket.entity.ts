import { BaseEntity, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopItem } from "src/shop/shop-item.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Basket extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(type => User)
    user: User;

    @ManyToMany(type => ShopItem, entity => entity.baskets)
    @JoinTable()
    items: ShopItem[];
}