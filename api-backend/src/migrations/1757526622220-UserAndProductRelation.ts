import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndProductRelation1757526622220 implements MigrationInterface {
    name = 'UserAndProductRelation1757526622220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
