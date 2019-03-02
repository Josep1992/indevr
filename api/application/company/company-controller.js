const service = require('../company/company-service');

module.exports = {
  async getCompaniesHandler(request) {
    const {
      auth: { credentials },
      query: { page, pageSize },
    } = request;
    return service.getCompaniesByUser(credentials.id, page, pageSize);
  },

  async getCompanyHandler(request) {
    return request.params.company;
  },

  async postCompanyHandler(request) {
    const { payload, auth } = request;
    return service.postCompany(payload, auth.credentials.id);
  },
};
