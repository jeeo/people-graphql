const personResolvers = require('./domain/person/resolvers');

const resolvers = {
  Query: {
    ...personResolvers.query,
  },
  Mutation: {
    ...personResolvers.mutation,
  },
};

module.exports = {
  resolvers,
};
