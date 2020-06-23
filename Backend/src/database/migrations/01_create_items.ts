import typeKnex from 'knex';

export async function up(knex: typeKnex) {
  return knex.schema.createTable('items', table => {

    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  })
}

export async function down(knex: typeKnex) {
  return knex.schema.dropTable('items');
}