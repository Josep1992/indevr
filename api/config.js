require('dotenv').config({ path: '../.env' });
const fs = require('fs');

const env = process.env.APP_ENV || 'development';
const config = {
  env,
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },
  development: {
    db: {
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB_DEV,
        port: process.env.POSTGRES_PORT,
        ssl: {
          ca: fs.readFileSync(`${__dirname}/ca-certificate.crt`),
        },
      },
      seedDirectory: './seeds/dev',
      migrationDirectory: './database/migrations',
      debug: process.env.DEBUG,
    },
  },
  production: {
    db: {
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB_PROD,
        port: process.env.POSTGRES_PORT,
        ssl: {
          ca: fs.readFileSync(`${__dirname}/ca-certificate.crt`),
        },
      },
      seedDirectory: './seeds/prod',
      migrationDirectory: './database/migrations',
      debug: false,
    },
  },
};

module.exports = config;
