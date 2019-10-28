module.exports = ({
  personSchema: `
    type Person {
      kind: PersonKind!
      name: String!
      companyName: String
      cpf: String
      cnpj: String
      gender: String
      birthDate: String
      email: String
      phones: [String]
      photo: String
      address: [Address]
    }

    enum PersonKind {
      LEGAL_PERSON
      NATURAL_PERSON
    }

    type Address {
      street: String
      number: String
      tip: String
      city: String
      state: String
      zipCode: String
    }
  `,
});
