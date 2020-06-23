import typeKnex from 'knex';

export async function up(knex: typeKnex) {
  return knex.schema.createTable('points_items', table => {

    table.increments('id').primary();

    table.integer('points_id')
      .notNullable()
      .references('id')
      .inTable('points'); 

    table.integer('items_id')
      .notNullable()
      .references('id')
      .inTable('items');
  })
}

export async function down(knex: typeKnex) {
  return knex.schema.dropTable('points_items');
}