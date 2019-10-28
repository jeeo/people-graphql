const personInput = `
  input AddressInput {
    street: String
    number: String
    tip: String
    city: String
    state: String
    zipCode: String
  }

  input PersonInput {
    name: String!
    companyName: String
    cpf: String
    cnpj: String
    gender: String
    birthDate: String
    email: String
    phones: [String]
    photo: String
    address: [AddressInput]
  }
`;

module.exports = {
  personInput
};
