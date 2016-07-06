// A module for interacting with the API, processing the data, and sorting it.
"use strict";
// For the static site, import mock data.
var mock1_1 = require('../mocks/mock1');
var stocks = [], meta_definitions = [], current_date = '', future_dates = [];
function processData(raw_data) {
    if (raw_data === void 0) { raw_data = mock1_1.mock_data; }
    var dates = raw_data.dates;
    stocks = dates[0].oids;
    meta_definitions = raw_data.meta_definitions;
    current_date = dates[0].ymd;
    future_dates = dates.map(function (date) { return date.ymd; });
    future_dates.splice(0, 1); //remove current date from future dates
    console.log(current_date, future_dates);
    //add closing prices for the future dates;
    var _loop_1 = function(stock) {
        var id = stock.id;
        var closes = [];
        var _loop_2 = function(ymd) {
            var oid = dates.find(function (date) { return date.ymd === ymd; }).oids.find(function (oid) { return oid.id === id; }), close_1 = oid ? oid.c : "no data";
            closes.push({
                ymd: ymd,
                close: close_1
            });
        };
        for (var _i = 0, future_dates_1 = future_dates; _i < future_dates_1.length; _i++) {
            var ymd = future_dates_1[_i];
            _loop_2(ymd);
        }
        stock.closes = closes;
    };
    for (var _a = 0, stocks_1 = stocks; _a < stocks_1.length; _a++) {
        var stock = stocks_1[_a];
        _loop_1(stock);
    }
}
function buildRows() {
    var rows = [];
    processData();
    console.log(stocks);
    for (var _i = 0, stocks_2 = stocks; _i < stocks_2.length; _i++) {
        var stock = stocks_2[_i];
        var row = [];
        for (var _a = 0, meta_definitions_1 = meta_definitions; _a < meta_definitions_1.length; _a++) {
            var metaDef = meta_definitions_1[_a];
            var sid = metaDef.sid;
            if (sid !== "id") {
                row.push(React.createElement("td", null, stock[sid]));
            }
        }
        var _loop_3 = function(ymd) {
            var close_2 = stock.closes.find(function (el) { return el.ymd === ymd; }).close;
            row.push(React.createElement("td", null, close_2));
        };
        for (var _b = 0, future_dates_2 = future_dates; _b < future_dates_2.length; _b++) {
            var ymd = future_dates_2[_b];
            _loop_3(ymd);
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
