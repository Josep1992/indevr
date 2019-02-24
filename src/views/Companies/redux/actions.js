import client from '../../../client';

export const POST_COMPANY = 'POST_COMPANY';

export const postCompany = payload => ({
  type: POST_COMPANY,
  promise: client.post('/companies', payload),
});
