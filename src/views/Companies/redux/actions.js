import client from '../../../client';

export const POST_COMPANY = 'POST_COMPANY';
export const GET_COMPANIES = 'GET_COMPANIES';
export const GET_COMPANY = 'GET_COMPANY';

export const postCompany = payload => ({
  type: POST_COMPANY,
  promise: client.post('/companies', payload),
});

export const getCompanies = (page = 0, pageSize = 20) => ({
  type: GET_COMPANIES,
  promise: client.get(`/companies?page=${page}&pageSize=${pageSize}`),
});

export const getCompany = companyId => ({
  type: GET_COMPANY,
  promise: client.get(`/companies/${companyId}`),
});
