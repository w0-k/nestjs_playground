import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DataCache extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 30,
    })
    cacheKey: string;

    @Column({
        type: "longtext"
    })
    data: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
}