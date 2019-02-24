const service = require('../company/company-service');

module.exports = {
  async getCompaniesHandler(request) {
    return service.getCompaniesByUser(request.auth.credentials.id);
  },

  async postCompanyHandler(request) {
    const { payload, auth } = request;
    return service.postCompany(payload, auth.credentials.id);
  },
};
