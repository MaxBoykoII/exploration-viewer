/// <reference path="../typings/index.d.ts" />

// A module for interacting with the API, processing the data, and sorting the data.

// For the static site, import mock data.
//import {mock_data} from '../mocks/mock1';

/*let stocks = [],
    raw_data = mock_data,
    meta_definitions = [],
    current_date = '',
    future_dates = [];*/



function processData(raw_data) {
    const dates = raw_data.dates,
        meta_definitions = raw_data.meta_definitions;
    let stocks = dates[0].oids,
        future_dates = dates.map((date) => date.ymd);
    future_dates.splice(0, 1); //remove current date from future_dates

    //add closing prices for the future dates;
    for (let stock of stocks) {
        const id = stock.id;
        let closes = [];
        for (let ymd of future_dates) {
            const oid = dates.find((date) => date.ymd === ymd).oids.find((oid) => oid.id === id),
                close = oid ? oid.c : "no data";

            closes.push({
                ymd,
                close
            });
        }
        stock.closes = closes;
    }
    this.setState({
        stocks,
        meta_definitions,
        future_dates
    });
}
//main function for interacting with the API

function fetch(query = '') {
    console.log(`fetch has been invoked with query = ${query}`);
    console.log(this);
    jQuery.ajax({
        method: 'GET',
        url: `../edp-api-v3a.php?m=${query}`,
        success: (data) => {
            console.log('request is a sucess!');
            processData.call(this, data);
            console.log('data updated!')
        },
        error: () => {
            console.log('something went wrong!');
            console.log(`Here is the query: ${query}`);
        },
        complete: () => {
            console.log('I am complete.');
        }
    });
}

function buildRows(stocks, meta_definitions, future_dates) {
    console.log('building rows!');
    let rows = [];

    for (let stock of stocks) {
        let row = [];
        for (let metaDef of meta_definitions) {
            const sid = metaDef.sid;
            if (sid !== "id") {
                row.push(<td>{stock[sid]}</td>);
            }
        }
        for (let ymd of future_dates) {
            const close = stock.closes.find((el) => el.ymd === ymd).close;
            row.push(<td>{close}</td>)
        }
        rows.push(<tr>{row}</tr>);
    }
    return rows;

};

//A helper the Table component will use in its render method;
function buildTable(stocks, meta_definitions, future_dates) {
    console.log(`length is ${stocks.length}`);
    if (stocks.length) {
        const rows = buildRows(stocks, meta_definitions, future_dates);
        return <table>{rows}</table>
    }
};

export {
    buildTable,
    fetch
};