const Boom = require('boom');
const Company = require('./Company');

module.exports = {
  async postCompany(payload, user_id) {
    return Company.query().insertAndFetch({ user_id, ...payload });
  },
};
