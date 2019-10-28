const { 
  naturalPersonValidation,
  legalPersonValidation,
  naturalPersonUpdateValidation,
  legalPersonUpdateValidation
} = require('./validation');

module.exports = ({
  query: {
    getPerson:  async (parent, args, { models }) => {
      let criteria = buildCriteria(args);
      const response = await models.Person.findOne(criteria)
        .catch(err => {
          console.error(err);
          return Error(err);
        });
      
      return response;
    },
  },
  mutation: {
    createPerson: async (parent, { person }, { models }) => {
      const personKind = checkPersonKind({person});
      const validationError = await validateInput(person, personKind);
      if (validationError) {
        return Error(validationError);
      }
      if (personKind === 'NATURAL_PERSON') {
        person.kind = 'NATURAL_PERSON';
      } else {
        person.kind = 'LEGAL_PERSON';
      }

      const response = await models.Person.create(person)
        .then(() => 'Person created')
        .catch(err => {
          console.error(err);
          return Error(err);
        })

      return response;
    },
    updatePerson: async (parent, { cpf, cnpj, person }, { models }) => {
      const criteria = buildCriteria({cpf, cnpj})
      const personKind = checkPersonKind({cpf, cnpj});
      const validationError = await validateUpdate(person, personKind);
      if (validationError) {
        return Error(validationError);
      }
      const response = await models.Person.updateOne(criteria, { $set: person})
        .then(() => 'Person updated')
        .catch(err => {
          console.error(err);
          return Error(err);
        });

      return response;
    },

    deletePerson: async (parent, { cpf, cnpj }, { models }) => {
      const criteria = buildCriteria({cpf, cnpj})
      const response = await models.Person.deleteOne(criteria)
        .then(({deletedCount}) => {
          if (!deletedCount) {
            return Error('Person not found');
          }
          return 'Person Deleted'
        })
        .catch(err => {
          console.error(err);
          return Error(err);
        });

      return response;
    },
  }
});

const checkPersonKind = ({person, cpf, cnpj}) => {
  if (cpf || person.cpf) return 'NATURAL_PERSON';
  if (cnpj || person.cnpj) return 'LEGAL_PERSON';

  return '';
};

const validateInput = async (person, personKind) => {
  if (!personKind) {
    return 'You must provide a CNPJ or a CPF';
  }
  if (personKind === 'NATURAL_PERSON') {
    const validation = await naturalPersonValidation(person);
    if (validation.error) {
      return validation.error;
    }
  } else {
    const validation = await legalPersonValidation(person);
    if (validation.error) {
      return validation.error;
    }
  }

  return '';
};

const validateUpdate = async (person, personKind) => {
  if (!personKind) {
    return 'You must provide a CNPJ or a CPF';
  }
  if (personKind === 'NATURAL_PERSON') {
    const validation = await naturalPersonUpdateValidation(person);
    if (validation.error) {
      return validation.error;
    }
  } else {
    const validation = await legalPersonUpdateValidation(person);
    if (validation.error) {
      return validation.error;
    }
  }

  return '';
};

const buildCriteria = args => {
  const criteria = {}
  Object.keys(args).filter(key => args[key]).forEach(key => criteria[key] = args[key]);
  return criteria;
}