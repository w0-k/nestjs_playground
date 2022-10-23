import { Basket } from "src/basket/basket.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 20,
    })
    name: string;

    @Column({
        length: 20,
    })
    lastName: string;

    @Column({
        length: 30,
    })
    email: string;

    @Column({
        type: "integer",
        scale: 9,
    })
    phoneNumber: number;

    @OneToOne(type => Basket/*, { eager: true }*/)
    @JoinColumn()
    basket: Basket;
}