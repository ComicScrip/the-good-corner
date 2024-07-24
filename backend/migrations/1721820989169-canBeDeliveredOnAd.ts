import { MigrationInterface, QueryRunner } from "typeorm";

export class CanBeDeliveredOnAd1721820989169 implements MigrationInterface {
  name = "CanBeDeliveredOnAd1721820989169";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ad" ADD "canBeDelivered" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ad" DROP COLUMN "canBeDelivered"`);
  }
}
