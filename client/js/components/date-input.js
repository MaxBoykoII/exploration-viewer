/// <reference path="../typings/index.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DateInput = (function (_super) {
    __extends(DateInput, _super);
    function DateInput() {
        _super.apply(this, arguments);
    }
    DateInput.prototype.render = function () {
        return (React.createElement("input", {type: 'text', placeholder: this.props.placeholder}));
    };
    return DateInput;
}(React.Component));
exports.DateInput = DateInput;
