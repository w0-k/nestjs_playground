import { BaseEntity, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopItem } from "src/shop/shop-item.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Basket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(type => User, { eager: true})
    user: User;

    @ManyToMany(type => ShopItem, entity => entity.baskets, { eager: true})
    @JoinTable()
    items: ShopItem[];
}