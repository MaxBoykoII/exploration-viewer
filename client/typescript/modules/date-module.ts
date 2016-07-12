/// <reference path="../typings/index.d.ts" />
//functions for interacting with the valid-dates api and handling date validation

function getValidDates() {
    jQuery.ajax({
        method: 'GET',
        url: '../valid-dates-api.php',
        success: (data) => {
            this.setState({
                'valid_dates': data
            });
        },
        error: (err) => {
            console.log(err);
        }
    })
}

function _submit(e) {
    e.preventDefault();
    const timeStamp = Date.parse(jQuery('#date-input').val()),
        valid_dates = this.state.valid_dates;

    if (!isNaN(timeStamp)) {
        const dates = valid_dates.filter((ymd) => Date.parse(ymd) >= timeStamp);

        const closest = dates.length ? dates.reduce(
            (acc, curr) => {
                const diff1 = Date.parse(curr) - timeStamp,
                    diff2 = Date.parse(acc) - timeStamp;
                return (diff1 < diff2) ? curr : acc;
            }
        ) : _.last(valid_dates);

        this.setState({
            "current_date": closest
        });
    }
    else {
        alert("Please enter a valid date in the yyyy-mm-dd format.");
    }
}

export {
    getValidDates,
    _submit
}