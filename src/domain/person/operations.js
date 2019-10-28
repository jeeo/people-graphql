const queries = `
  getPerson(cpf: String, cnpj: String): Person
`;

const mutations = `
  createPerson(person: PersonInput!): String
  deletePerson(cpf: String, cnpj: String): String
  updatePerson(cpf: String, cnpj: String, person: PersonInput!): String
`;

module.exports = {
  queries,
  mutations
};