/// <reference path="../typings/index.d.ts" />
function validDates() {
    jQuery.ajax({
        method: 'GET',
        url: '/valid-dates-api.php',
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
console.log(validDates());
