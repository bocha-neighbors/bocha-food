var Tabletop = require('tabletop')

var public_spreadsheet_url =
  'https://docs.google.com/spreadsheets/d/1xMW98m2-Y8rrbmACA9l1fUT5jb4tKvrRBCSWvH28guw/pubhtml?gid=1526253182&single=true'
Tabletop.init({ key: public_spreadsheet_url,
                callback: showInfo,
                simpleSheet: true,
                debug: false
})
function showInfo(data, tabletop) {
  console.log(data)
  // For each item in the data
  // Check if the item exists in the DB
  // If exists
    // Update the data
  // If does not exist
    // Insert a new row
} // showInfo declaration
