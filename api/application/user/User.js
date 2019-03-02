const Knex = require('knex');
const uuid = require('uuid');
const { Model } = require('objection');
const connection = require('../../knexfile');
const knexConnection = Knex(connection);
const publicUserColumns = require('./public-user-columns');

Model.knex(knexConnection);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get notFoundMessage() {
    return 'Invalid user';
  }

  static get namedFilters() {
    return {
      publicUserProfile: builder => builder.clearSelect().columns(publicUserColumns),
    };
  }

  static get relationMappings() {
    return {
      companies: {
        relation: Model.HasManyRelation,
        modelClass: require('../company/Company'),
        join: {
          from: 'users.id',
          to: 'companies.user_id',
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuid.v4();
    this.created_at = new Date().toISOString();
  }
}

module.exports = User;
