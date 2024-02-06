import { ApolloServer } from "@apollo/server";
import db from "../backend/src/db";
import getSchema from "../backend/src/schema";

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

let s: ApolloServer;

export async function execute(operation: any) {
  return (await s.executeOperation(operation)) as any;
}

beforeAll(async () => {
  await db.initialize();
  const schema = (await getSchema()) as any;
  s = new ApolloServer({ schema });
  await s.start();
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await db.destroy();
  await s.stop();
});
