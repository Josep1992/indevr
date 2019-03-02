const Joi = require('joi');
const {
  asyncValidation,
  objection: { rowExists, rowExistsWhere },
} = require('@synapsestudios/hapi-async-validation');

const controller = require('./Company-controller');
const Company = require('./Company');

module.exports = {
  name: 'Company Routes',
  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/companies',
        handler: controller.getCompaniesHandler,
        config: {
          auth: {
            strategies: ['jwt'],
          },
        },
      },
      {
        method: 'GET',
        path: '/companies/{company}',
        handler: controller.getCompanyHandler,
        config: {
          auth: {
            strategies: ['jwt'],
            scope: ['company-{params.company}'],
          },
          validate: {
            params: asyncValidation(
              {
                company: Joi.string()
                  .uuid()
                  .required(),
              },
              {
                company: rowExists(Company, 'id', Company.notFoundMessage),
              }
            ),
          },
        },
      },
      {
        method: 'POST',
        path: '/companies',
        handler: controller.postCompanyHandler,
        config: {
          auth: {
            strategies: ['jwt'],
          },
          validate: {
            payload: {
              company_name: Joi.string()
                .max(255)
                .required(),
              street: Joi.string()
                .max(255)
                .allow(''),
              street2: Joi.string()
                .max(255)
                .allow(''),
              city: Joi.string()
                .max(64)
                .allow(''),
              state: Joi.string()
                .max(2)
                .allow(''),
              cross_streets: Joi.string()
                .max(255)
                .allow(''),
              website: Joi.string()
                .max(255)
                .allow(''),
              linkedin: Joi.string()
                .max(64)
                .allow(''),
              twitter: Joi.string()
                .max(64)
                .allow(''),
              facebook: Joi.string()
                .max(64)
                .allow(''),
              description: Joi.string().allow(''),
              notes: Joi.string().allow(''),
              logo: Joi.string().allow(''),
            },
          },
        },
      },
    ]);
  },
};
