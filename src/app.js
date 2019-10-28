require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

const models = require('./models');
const { databaseConnection } = require('./db');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const app = express();

app.use(cors());

const run = async () => {
  const database = await databaseConnection(process.env.DB_HOST).catch(err => {
    console.error(err);
  });

  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: (req) => {
      if (req) {
        return { models };
      }
    }
  });
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}/graphql`);
  });
};

run();
