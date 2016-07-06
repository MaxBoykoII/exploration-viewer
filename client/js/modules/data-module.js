// A module for interacting with the API, processing the data, and sorting it.
"use strict";
// For the static site, import mock data.
var mock1_1 = require('../mocks/mock1');
var stocks = [], meta_definitions = [];
function processData(raw_data) {
    if (raw_data === void 0) { raw_data = mock1_1.mock_data; }
    stocks = raw_data.dates[0].oids;
    meta_definitions = raw_data.meta_definitions;
}
function buildRows() {
    var rows = [];
    processData();
    console.log(stocks);
    for (var _i = 0, stocks_1 = stocks; _i < stocks_1.length; _i++) {
        var stock = stocks_1[_i];
        var row = [];
        for (var _a = 0, meta_definitions_1 = meta_definitions; _a < meta_definitions_1.length; _a++) {
            var metaDef = meta_definitions_1[_a];
            var sid = metaDef.sid;
            if (sid !== "id") {
                row.push(React.createElement("td", null, stock[sid]));
            }
        }
        rows.push(React.createElement("tr", null, row));
    }
    return rows;
}
;
//A helper the Table component will use in its render method;
function buildTable() {
    /* let rows = [<tr>
   <td>Gold</td>
   <td>Silver</td>
   </tr>,
         <tr>
   <td>1300</td>
   <td>230</td>
   </tr>
     ];*/
    var rows = buildRows();
    return React.createElement("table", null, rows);
}
exports.buildTable = buildTable;
;
