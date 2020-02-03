export const userTable = "\nexports.up = function(knex){\n\t return knex.schema.createTable('users', tbl => {\n\t\t //ID\n\t\t tbl.increments();\n\n\t\t //Strings\n\t\t tbl.string('email').notNullable().unique();\n\t\t tbl.string('password').notNullable();\n\t });  \n};\n\nexports.down = function(knex) {\n\t return knex.schema.dropTableIfExists('developers');\n};"