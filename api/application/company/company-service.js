const Boom = require('boom');
const uuid = require('uuid');
const Company = require('./Company');
const s3 = require('../../lib/aws');
const config = require('../../config');

module.exports = {
  async getCompaniesByUser(user_id, page, pageSize) {
    return Company.query()
      .orderBy('company_name', 'ASC')
      .page(page, pageSize)
      .where({ user_id });
  },

  async postCompany(payload, user_id) {
    const imagePromise = new Promise((resolve, reject) => {
      if (payload.logo) {
        const key = uuid.v4();
        const buffer = new Buffer.from(payload.logo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        s3.putObject(
          {
            Bucket: config.aws.bucket,
            Key: key,
            Body: buffer,
            ContentType: 'image/png',
            ACL: 'public-read',
          },
          err => {
            if (err) {
              reject(err);
            }

            resolve(`https://s3-${config.aws.region}.amazonaws.com/${config.aws.bucket}/${key}`);
          }
        );
      } else {
        resolve(null);
      }
    });

    return Promise.all([imagePromise]).then(value => {
      payload.logo = value[0];
      return Company.query().insertAndFetch({ user_id, ...payload });
    });
  },
};
