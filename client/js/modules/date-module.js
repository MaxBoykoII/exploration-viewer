/// <reference path="../typings/index.d.ts" />
//functions for interacting with the valid-dates api and handling date validation
"use strict";
function getValidDates() {
    var _this = this;
    jQuery.ajax({
        method: 'GET',
        url: '../valid-dates-api.php',
        success: function (data) {
            _this.setState({
                'valid_dates': data
            });
        },
        error: function (err) {
            console.log(err);
        }
    });
}
exports.getValidDates = getValidDates;
function _submit(e) {
    e.preventDefault();
    var timeStamp = Date.parse(jQuery('#date-input').val()), valid_dates = this.state.valid_dates;
    if (!isNaN(timeStamp)) {
        var dates = valid_dates.filter(function (ymd) { return Date.parse(ymd) >= timeStamp; });
        var closest = dates.length ? dates.reduce(function (acc, curr) {
            var diff1 = Date.parse(curr) - timeStamp, diff2 = Date.parse(acc) - timeStamp;
            return (diff1 < diff2) ? curr : acc;
        }) : _.last(valid_dates);
        this.setState({
            "current_date": closest
        });
    }
    else {
        alert("Please enter a valid date in the yyyy-mm-dd format.");
    }
}
exports._submit = _submit;
