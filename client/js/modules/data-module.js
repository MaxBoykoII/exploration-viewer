/// <reference path="../typings/index.d.ts" />
"use strict";
// A module for interacting with the main API, processing the data, and sorting the data.
function processData(raw_data) {
    var dates = raw_data.dates, meta_definitions = raw_data.meta_definitions;
    var stocks = dates[0].oids, future_dates = dates.map(function (date) { return date.ymd; });
    future_dates.splice(0, 1); //remove current date from future_dates
    //add closing prices for the future dates;
    var _loop_1 = function(stock) {
        var id = stock.id;
        var closes = [];
        var _loop_2 = function(ymd) {
            var oid = dates.find(function (date) { return date.ymd === ymd; }).oids.find(function (oid) { return oid.id === id; }), close_1 = oid ? oid.c : "NA";
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
    this.setState({
        stocks: stocks,
        meta_definitions: meta_definitions,
        future_dates: future_dates
    });
}
//main function for interacting with the API
function fetch(query) {
    var _this = this;
    if (query === void 0) { query = ''; }
    jQuery.ajax({
        method: 'GET',
        url: "../edp-api-v3a.php?m=" + query,
        success: function (data) {
            processData.call(_this, data);
        },
        error: function () {
            console.log('something went wrong!');
        }
    });
}
exports.fetch = fetch;
function buildRows(stocks, meta_definitions, future_dates) {
    var rows = [];
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
    return (React.createElement("tbody", null, rows));
}
function buildThead(meta_definitions, future_dates) {
    var th_arr = [];
    for (var _i = 0, meta_definitions_2 = meta_definitions; _i < meta_definitions_2.length; _i++) {
        var metaDef = meta_definitions_2[_i];
        if (metaDef.sid !== 'id') {
            th_arr.push(React.createElement("th", null, metaDef.short));
        }
    }
    for (var _a = 0, future_dates_3 = future_dates; _a < future_dates_3.length; _a++) {
        var ymd = future_dates_3[_a];
        th_arr.push(React.createElement("th", null, ymd));
    }
    return (React.createElement("thead", {className: 'thead-default'}, React.createElement("tr", null, th_arr)));
}
//A helper the Table component will use in its render method;
function buildTable(stocks, meta_definitions, future_dates) {
    if (stocks.length) {
        var rows = buildRows(stocks, meta_definitions, future_dates);
        return (React.createElement("div", {className: "table-responsive"}, React.createElement("table", {className: "table table-striped table-hover table-bordered table-condensed"}, buildThead(meta_definitions, future_dates), rows)));
    }
}
exports.buildTable = buildTable;
;
