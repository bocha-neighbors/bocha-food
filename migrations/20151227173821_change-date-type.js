
exports.up = function(knex, Promise) {
  return knex.schema.table('items', function(table) {
    table.dropColumn('price_updated')
  })
};

exports.down = function(knex, Promise) {

};
