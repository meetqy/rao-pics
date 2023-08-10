import { MigrationInterface, QueryRunner } from "typeorm";

export class Sqlite1691650759235 implements MigrationInterface {
    name = 'Sqlite1691650759235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
