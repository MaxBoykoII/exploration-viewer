// A module for interacting with the API, processing the data, and sorting it.

// For the static site, import mock data.
import {
    mock_data
}
from '../mocks/mock1';

let stocks = [],
    meta_definitions = [],
    current_date = '',
    future_dates = [];

function processData(raw_data = mock_data) {
    const dates = raw_data.dates;
    stocks = dates[0].oids;
    meta_definitions = raw_data.meta_definitions;
    current_date = dates[0].ymd;
    future_dates = dates.map((date) => date.ymd);
    future_dates.splice(0, 1); //remove current date from future dates

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
}

function buildRows() {
    let rows = [];
    processData();
    
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
function buildTable() {

    const rows = buildRows();
    return <table>{rows}</table>
};

export {
    buildTable
};