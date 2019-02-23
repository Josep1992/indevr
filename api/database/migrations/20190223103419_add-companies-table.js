exports.up = async knex => {
  await knex.schema.createTable('companies', table => {
    table.uuid('id').primary();
    table.uuid('user_id').references('users.id');
    table.string('company_name', 255);
    table.string('street', 255);
    table.string('street2', 255);
    table.string('city', 64);
    table.string('state', 2);
    table.string('cross_streets', 255);
    table.string('website', 255);
    table.string('linkedin', 64);
    table.string('twitter', 64);
    table.string('facebook', 64);
    table.text('description');
    table.text('notes');
    table.timestamp('updated_at');
    table.timestamp('created_at').notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('companies');
};
