import db from "../backend/src/db";
import serverPromise from "../backend/src/index";

// https://blog.tooljet.com/clearing-tables-before-each-test-nestjs-typeorm/
// https://github.com/typeorm/typeorm/issues/2978#issuecomment-730596460
async function clearDB() {
  const entities = db.entityMetadatas;
  return Promise.all(
    entities.map((entity) => db.getRepository(entity.name).delete({}))
  );
}

// TODO: init db before all tests
// TODO: clear db before each tests
// TODO: close db connection after all tests

export let s: any;

export async function execute(operation: any) {
  return (await s.executeOperation(operation)) as any;
}

beforeAll(async () => {
  await db.initialize();
  s = (await serverPromise).server;
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await db.destroy();
  await (await serverPromise).stop();
});
