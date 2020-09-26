import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from 'cors';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
 

import { MovieResolver } from "./resolvers/MovieResolver";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
  const app = express();

  await createConnection();

	const RedisStore = connectRedis(session)
	const redisClient = redis.createClient({ password: 'ben' })

	app.use(cors({
		credentials: true,		
		origin: 'http://localhost:3000'
	}));
 
	app.use(
		session({
			name: 'sid',
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365,
				path: '/',
        httpOnly: true,
        sameSite: "lax",
        secure: false,
			},
			store: new RedisStore({ client: redisClient }),
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: false
		})
	)


  const apolloServer: ApolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MovieResolver, UserResolver]
    }),
		context: ({ req }) => ({ req })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on port 4000");
  });
})();
