const { generateHash } = require( '../../middleware/auth' );

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex( 'users' ).insert([
        {id: 1, email: 'john_doe@email.com', password: generateHash('password1').toString()},
        {id: 2, email: 'jane_doe@email.com', password: generateHash('password2').toString()},
      ]);
    });
};
