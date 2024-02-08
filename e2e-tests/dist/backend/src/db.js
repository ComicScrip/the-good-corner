"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDB = void 0;
const typeorm_1 = require("typeorm");
const ad_1 = require("./entities/ad");
const tag_1 = require("./entities/tag");
const category_1 = require("./entities/category");
const user_1 = require("./entities/user");
const env_1 = require("./env");
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST } = env_1.default;
const db = new typeorm_1.DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [ad_1.Ad, tag_1.Tag, category_1.Category, user_1.default],
    synchronize: true,
    logging: env_1.default.NODE_ENV !== "test",
});
async function clearDB() {
    const entities = db.entityMetadatas;
    const tableNames = entities
        .map((entity) => `"${entity.tableName}"`)
        .join(", ");
    await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}
exports.clearDB = clearDB;
exports.default = db;
//# sourceMappingURL=db.js.map