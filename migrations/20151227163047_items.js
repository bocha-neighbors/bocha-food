
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments()
    table.string('vendor')
    table.string('item_type')
    table.string('vendor_item_type')
    table.string('company')
    table.text('item_description')
    table.float('quantity')
    table.string('unit')
    table.float('price')
    table.float('unit_price')
    table.string('typical_origin')
    table.dateTime('price_updated')
    table.string('wholesale_unit')
    table.float('wholesale_unit_price')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items')
}
