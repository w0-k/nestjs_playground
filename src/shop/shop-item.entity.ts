import { Basket } from "src/basket/basket.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn /*, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne*/ } from "typeorm";
// import { ShopItemDetails } from "./shop-item-details.entity";
// import { ShopSet } from "./shop-set.entity";

@Entity()
export class ShopItem extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 50,
    })
    name: string;

    @Column({
        type: "longtext",
    })
    description: string;

    @Column({
        type: "float",
        precision: 4,
        scale: 2, 
    })
    price: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    // @Column({
    //     default: false,
    // })
    // wasEverBought: boolean;

    // @OneToOne(type => ShopItemDetails, { eager: true })
    // @JoinColumn()
    // details: ShopItemDetails;

    // /* Subproduct */
    // @ManyToOne(type => ShopItem, entity => entity.subShopItems)
    // mainShopItem: ShopItem;

    // @OneToMany(type => ShopItem, entity => entity.mainShopItem)
    // subShopItems: ShopItem[];

    // @ManyToMany(type => ShopSet, entity => entity.items/*, { eager: true }*/)
    // @JoinTable()
    // sets: ShopSet[];
}
