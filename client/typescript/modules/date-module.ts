/// <reference path="../typings/index.d.ts" />

function validDates(){
    jQuery.ajax({
        method: 'GET',
        url: '/valid-dates-api.php',
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err);
        }
    })
}

console.log(validDates());