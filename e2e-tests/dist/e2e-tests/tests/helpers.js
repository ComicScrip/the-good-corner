"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.initDB = void 0;
const db_1 = require("../../backend/src/db");
async function initDB() {
    await db_1.default.initialize();
}
exports.initDB = initDB;
async function closeDB() {
    await db_1.default.destroy();
}
exports.closeDB = closeDB;
//# sourceMappingURL=helpers.js.map