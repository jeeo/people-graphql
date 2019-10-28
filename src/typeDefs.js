const { gql } = require('apollo-server')
const { schema: personSchema } = require('./domain/person');
const { buildGql } = require('./utils/gql');
const personOperations = require('./domain/person/operations');
const { personInput } = require('./domain/person/inputs');

module.exports = {
  typeDefs: gql`
  ${buildGql(personSchema)}
  ${buildGql(personInput)}

  type Query {
    ${personOperations.queries}    
  }

  type Mutation {
    ${personOperations.mutations}
  }
  `
};
