import client from '../../../client';

export const POST_COMPANY = 'POST_COMPANY';
export const GET_COMPANIES = 'GET_COMPANIES';

export const postCompany = payload => ({
  type: POST_COMPANY,
  promise: client.post('/companies', payload),
});

export const getCompanies = () => ({
  type: GET_COMPANIES,
  promise: client.get('/companies'),
});
