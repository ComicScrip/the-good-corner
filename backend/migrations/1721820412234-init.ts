import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1721820412234 implements MigrationInterface {
    name = 'Init1721820412234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "hashedPassword" character varying, "role" character varying NOT NULL DEFAULT 'visitor', "avatar" character varying NOT NULL DEFAULT 'https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png', "nickname" character varying NOT NULL, "adsId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "description" text, "price" double precision NOT NULL, "location" character varying NOT NULL, "picture" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, "categoryId" integer, CONSTRAINT "PK_0193d5ef09746e88e9ea92c634d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad_tags_tag" ("adId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_95b9f8a69d8090f2ec1abeb646c" PRIMARY KEY ("adId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88c37707a52c0b2a820a8d4ebc" ON "ad_tags_tag" ("adId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd22b65edffb7dd9c8f1a79052" ON "ad_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f6b5c8360d987b210a58f9bb597" FOREIGN KEY ("adsId") REFERENCES "ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad" ADD CONSTRAINT "FK_60e59329bce691e9d31a3e3131b" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad" ADD CONSTRAINT "FK_c418809c6e081f861cefe495668" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad_tags_tag" ADD CONSTRAINT "FK_88c37707a52c0b2a820a8d4ebc4" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ad_tags_tag" ADD CONSTRAINT "FK_cd22b65edffb7dd9c8f1a790527" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad_tags_tag" DROP CONSTRAINT "FK_cd22b65edffb7dd9c8f1a790527"`);
        await queryRunner.query(`ALTER TABLE "ad_tags_tag" DROP CONSTRAINT "FK_88c37707a52c0b2a820a8d4ebc4"`);
        await queryRunner.query(`ALTER TABLE "ad" DROP CONSTRAINT "FK_c418809c6e081f861cefe495668"`);
        await queryRunner.query(`ALTER TABLE "ad" DROP CONSTRAINT "FK_60e59329bce691e9d31a3e3131b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f6b5c8360d987b210a58f9bb597"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd22b65edffb7dd9c8f1a79052"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88c37707a52c0b2a820a8d4ebc"`);
        await queryRunner.query(`DROP TABLE "ad_tags_tag"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
