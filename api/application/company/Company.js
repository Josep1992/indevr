const Knex = require('knex');
const uuid = require('uuid');
const { Model } = require('objection');
const connection = require('../../knexfile');
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Company extends Model {
  static get tableName() {
    return 'companies';
  }

  static get notFoundMessage() {
    return 'Invalid company';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $beforeInsert() {
    this.id = uuid.v4();
    this.created_at = new Date().toISOString();
  }
}

module.exports = Company;
