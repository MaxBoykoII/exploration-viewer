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
        var range = (this.props.min && this.props.max) ? React.createElement("p", null, " Range: ", this.props.min + " to " + this.props.max, " ") : null;
        return (React.createElement("form", null, React.createElement("input", {type: 'text', id: "date-input", placeholder: this.props.placeholder}), " ", React.createElement("button", {className: "btn btn-primary", onClick: this.props.submitCallback}, "Submit"), range));
    };
    return DateInput;
}(React.Component));
exports.DateInput = DateInput;
