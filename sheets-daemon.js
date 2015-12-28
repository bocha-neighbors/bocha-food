var knex = require('./db/knex')
var Tabletop = require('tabletop')

function Item() {
  return knex('items')
}



var public_spreadsheet_url =
  'https://docs.google.com/spreadsheets/d/1xMW98m2-Y8rrbmACA9l1fUT5jb4tKvrRBCSWvH28guw/pubhtml?gid=1526253182&single=true'
Tabletop.init({ key: public_spreadsheet_url,
                callback: updateDatabase,
                simpleSheet: true,
                debug: false
})
function updateDatabase(data, tabletop) {
  // For each item in the data
  for (var i=0; i<data.length; i++) {
    var item = data[i]
    // Check if the item exists in the DB
    Item().where(
      { vendor_item_id: item.vendor_item_id }
    )
    .then(function(result){
      if (result[0])
        // If the item already exists, update the database with (potentially) new values
        console.log('Found ' + result[0].vendor_item_id)
      else
      {
        // If does not exist insert a new row
        console.log('Not found')
        Item().insert( {
          vendor: item.vendor,
          item_type: item.item_type,
          vendor_item_id: item.vendor_item_id,
          company: item.company,
          item_description: item.item_description,
          quantity: parseFloat(item.quantity),
          unit: item.unit,
          price: parseFloat(item.price),
          unit_price: parseFloat(item.unit_price),
          typical_origin: item.typical_origin,
          wholesale_unit: item.wholesale_unit,
          wholesale_unit_price: parseFloat(item.wholesale_unit_price)
        }, 'id')
        .then(function(result){
          console.log('Inserted item', result)
        }) // end Item().insert()
      } // end else
    }) // end .then()
    .catch(function(err) {
      console.log('There was an err with #' + i)
      console.error(err)
    })







  } // for
} // updateDatabase declaration
