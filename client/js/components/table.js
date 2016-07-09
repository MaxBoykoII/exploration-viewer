/// <reference path="../typings/index.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var data_module_1 = require('../modules/data-module');
var date_input_1 = require('./date-input');
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        _super.call(this);
        this.state = {
            'current_date': '2016-02-02',
            'future_dates': [],
            'stocks': [],
            'meta_definitions': []
        };
    }
    ;
    Table.prototype.componentWillMount = function () {
        data_module_1.fetch.call(this, this.state.current_date);
    };
    Table.prototype.render = function () {
        return (React.createElement("div", null, " ", React.createElement("p", null, "The current date for this table instance is ", this.state.current_date), React.createElement(date_input_1.DateInput, {className: "form-control", placeholder: this.state.current_date}), data_module_1.buildTable(this.state.stocks, this.state.meta_definitions, this.state.future_dates)));
    };
    ;
    return Table;
}(React.Component));
exports.Table = Table;
