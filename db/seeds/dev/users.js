
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, username: 'DBULL7', password: 'a'},
        {id: 2, username: 'Reptar', password: 'gucci'}
      ]);
    });
};
