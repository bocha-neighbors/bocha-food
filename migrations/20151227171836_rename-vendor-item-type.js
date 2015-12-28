
exports.up = function(knex, Promise) {
  return knex.schema.table('items', function(table) {
    table.renameColumn('vendor_item_type', 'vendor_item_id')
  })
}

exports.down = function(knex, Promise) {

}
