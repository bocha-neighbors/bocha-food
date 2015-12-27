
exports.up = function(knex, Promise) {
  return knex.schema.createTable('catalog', function(table) {
    table.increments()
    table.integer('item_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('catalog')
};
