import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { Pool } from 'pg';
import "reflect-metadata";
import { typeDefs } from "./schema/main";
import { resolvers } from "./resolvers/resolvers";

export const pool = new Pool({
  connectionString: 'postgres://tgksohmv:IzwUWzxnsoeJjy0KriohHey1T_uDExcQ@heffalump.db.elephantsql.com/tgksohmv'
})

async function startApolloServer() {
  const app = express();
  app.use(cors({
    origin: 'https://studio.apollographql.com',
    credentials: true
  }))
  app.use(cookieParser());
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx: any) => ctx
  });
  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.listen({port: 4000}, () => {
    console.log(`Server ready at port http://localhost:4000${server.graphqlPath}`)
  })
}
startApolloServer()

// app.listen(3000, () => console.log('listening on port 3000'))

