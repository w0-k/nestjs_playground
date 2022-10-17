import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationRecord1665603273725 implements MigrationInterface {
    name = 'migrationRecord1665603273725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` longtext NOT NULL DEFAULT 'brak'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(60) NOT NULL`);
    }

}
