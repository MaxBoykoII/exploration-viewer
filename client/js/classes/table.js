/// <reference path="../typings/index.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        _super.apply(this, arguments);
    }
    Table.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("table", null, React.createElement("tr", null, React.createElement("td", null, "Gold"), React.createElement("td", null, "Silver")), React.createElement("tr", null, React.createElement("td", null, "1300"), React.createElement("td", null, "230")))));
    };
    ;
    return Table;
}(React.Component));
exports.Table = Table;
