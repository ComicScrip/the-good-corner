import "reflect-metadata";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";
import env from "./env";
import db from "./db";
import { authChecker } from "./auth";
import AdsResolver from "./resolvers/adsResolver";
import TagsResolver from "./resolvers/tagsResolver";
import CategoriesResolver from "./resolvers/categoriesResolver";
import UserResolver from "./resolvers/userResolver";

const { SERVER_PORT: port, CORS_ALLOWED_ORIGINS: allowedOrigins } = env;

buildSchema({
  resolvers: [TagsResolver, AdsResolver, CategoriesResolver, UserResolver],
  authChecker,
}).then(async (schema) => {
  await db.initialize();
  const app = express();
  const httpServer = http.createServer(app);
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  const server = new ApolloServer({ schema, plugins });
  await server.start();
  const corsConfig = { origin: allowedOrigins.split(","), credentials: true };
  const corsMiddleware = cors<cors.CorsRequest>(corsConfig);
  app.use(
    corsMiddleware,
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});
