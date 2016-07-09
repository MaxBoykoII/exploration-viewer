/// <reference path="../typings/index.d.ts" />

// A module for interacting with the main API, processing the data, and sorting the data.


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

    jQuery.ajax({
        method: 'GET',
        url: `../edp-api-v3a.php?m=${query}`,
        success: (data) => {
            processData.call(this, data);

        },
        error: () => {
            console.log('something went wrong!');
        }
    });
}

function buildRows(stocks, meta_definitions, future_dates) {
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
    if (stocks.length) {
        const rows = buildRows(stocks, meta_definitions, future_dates);
        return <table>{rows}</table>
    }
};

export {
    buildTable,
    fetch
};