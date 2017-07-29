
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('email').unique();
      table.integer('total_score');
      table.integer('total_matches');
      table.integer('total_wins');
      table.string('password');
      table.timestamps(true, true);
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ])
}
