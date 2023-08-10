import { MigrationInterface, QueryRunner } from "typeorm";

export class Sqlite1691650913914 implements MigrationInterface {
    name = 'Sqlite1691650913914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "title" varchar NOT NULL, "age" integer NOT NULL, "email" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "title", "age", "email") SELECT "id", "firstName", "lastName", "age", "email" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "email" varchar)`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "age", "email") SELECT "id", "firstName", "title", "age", "email" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
