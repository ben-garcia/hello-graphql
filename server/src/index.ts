import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MovieResolver } from "./resolvers/MovieResolver";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
  const app = express();

  await createConnection();

  const apolloServer: ApolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MovieResolver, UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: true });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();
