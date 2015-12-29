var knex = require('./db/knex')
var Tabletop = require('tabletop')

function Items() {
  return knex('items')
}

var public_spreadsheet_url =
  'https://docs.google.com/spreadsheets/d/1xMW98m2-Y8rrbmACA9l1fUT5jb4tKvrRBCSWvH28guw/pubhtml?gid=1526253182&single=true'

Tabletop.init({ key: public_spreadsheet_url,
                callback: showData,
                simpleSheet: true,
                parseNumbers: false,
                debug: false
})

function updateDatabase(data, tabletop) {
  console.log('Updating existing items')
  var length = data.length
  for (var i=0; i<length; i++) {
    var itemFromSheet = data[i]
    Items().where({ vendor_item_id: itemFromSheet.vendor_item_id })
    .update({
      vendor: itemFromSheet.vendor,
      item_type: itemFromSheet.item_type,
      vendor_item_id: itemFromSheet.vendor_item_id,
      company: itemFromSheet.company,
      item_description: itemFromSheet.item_description,
      quantity: parseFloat(itemFromSheet.quantity),
      unit: itemFromSheet.unit,
      price: parseFloat(itemFromSheet.price),
      unit_price: parseFloat(itemFromSheet.unit_price),
      typical_origin: itemFromSheet.typical_origin,
      wholesale_unit: itemFromSheet.wholesale_unit,
      wholesale_unit_price: parseFloat(itemFromSheet.wholesale_unit_price)
    })
    .catch(function(err) {
      console.log(err)
    })
    .then(function(results) {
      console.log('Finish updating.')
      console.log('Results: ', results)
    })
  } // for loop
} // updateDatabase declaration

function replaceDatabase(data, tabletop) {
  // First, delete all rows in database.
  // Put a condition in the .where() that selects all the rows.
  console.log('Clearing all items from the database.')
  Items().del().where({
    vendor: 'Silver Monkeys'
  })
  .then(function(results) {
    console.log(results)
  })

  // Then, insert all items from the spreadsheet into the database
  console.log('Replacing database with google spreadsheet items.')
  var length = data.length
  for (var i=0; i<length; i++) {
    var itemFromSheet = data[i]
    Items()
    .insert({
      vendor: itemFromSheet.vendor,
      item_type: itemFromSheet.item_type,
      vendor_item_id: itemFromSheet.vendor_item_id,
      company: itemFromSheet.company,
      item_description: itemFromSheet.item_description,
      quantity: parseFloat(itemFromSheet.quantity),
      unit: itemFromSheet.unit,
      price: parseFloat(itemFromSheet.price),
      unit_price: parseFloat(itemFromSheet.unit_price),
      typical_origin: itemFromSheet.typical_origin,
      wholesale_unit: itemFromSheet.wholesale_unit,
      wholesale_unit_price: parseFloat(itemFromSheet.wholesale_unit_price)
    }, 'id')
    .catch(function(err) {
      console.log(err)
    })
    .then(function(results) {
      console.log('Finish updating.')
      console.log('Results: ', results)
    })
  } // for loop
} // replaceDatabase declaration

function showData(data, tabletop) {
  console.log(data)
}
