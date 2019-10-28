const { Schema, model } = require("mongoose");

const AddressSchema = Schema({
  street: String,
  number: String,
  tip: String,
  city: String,
  state: String,
  zipCode: String,
});

const PersonSchema = Schema({
  kind: {
    type: String,
    required: true,
    enum: ['LEGAL_PERSON', 'NATURAL_PERSON'],
  },
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  cpf: {
    type: String,
    trim: true, 
    index: true,
    unique: true,
    sparse: true,
    min: 11,
    max: 11
  },
  cnpj: {
    type: String,
    trim: true, 
    index: true,
    unique: true,
    sparse: true,
    min: 14
  },
  gender: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  email: {
    type: String,
    trim: true, 
    index: true,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,
  },
  address: [AddressSchema]
});

module.exports = model('Person', PersonSchema);