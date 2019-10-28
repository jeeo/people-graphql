const Joi = require('@hapi/joi');

const naturalPersonSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  gender: Joi.string().required(),
  birthDate: Joi.string().isoDate().required(),
  email: Joi.string().email(),
  phones: Joi.array(),
  photo: Joi.string().uri(),
  address: Joi.array()
});

const legalPersonSchema = Joi.object({
  name: Joi.string().required(),
  companyName: Joi.string().required(),
  cnpj: Joi.string().min(14),
  email: Joi.string().email(),
  phones: Joi.array(),
  photo: Joi.string().uri(),
  address: Joi.array()
});

const naturalPersonUpdateSchema = Joi.object({
  name: Joi.string(),
  cpf: Joi.string().length(11),
  gender: Joi.string(),
  birthDate: Joi.string().isoDate(),
  email: Joi.string().email(),
  phones: Joi.array(),
  photo: Joi.string().uri(),
  address: Joi.array()
});

const legalPersonUpdateSchema = Joi.object({
  name: Joi.string(),
  companyName: Joi.string(),
  cnpj: Joi.string().min(14),
  email: Joi.string().email(),
  phones: Joi.array(),
  photo: Joi.string().uri(),
  address: Joi.array()
});



module.exports = {
  naturalPersonValidation: data => naturalPersonSchema.validateAsync(data),
  legalPersonValidation: data => legalPersonSchema.validateAsync(data),
  naturalPersonUpdateValidation: data => naturalPersonUpdateSchema.validateAsync(data),
  legalPersonUpdateValidation: data => legalPersonUpdateSchema.validateAsync(data),
};
