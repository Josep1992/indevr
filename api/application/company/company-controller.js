const service = require('../company/company-service');

module.exports = {
  async postCompanyHandler(request) {
    const { payload, auth } = request;
    return service.postCompany(payload, auth.credentials.id);
  },
};
