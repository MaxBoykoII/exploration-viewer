// A module for interacting with the API, processing the data, and sorting it.

// For the static site, import mock data.
import {
    mock_data
}
from '../mocks/mock1';

let stocks = [],
    meta_definitions = [];

function processData(raw_data = mock_data) {
    stocks = raw_data.dates[0].oids;
    meta_definitions = raw_data.meta_definitions;
}

function buildRows() {
    let rows = [];
    processData();
    console.log(stocks);
    for (let stock of stocks) {
        let row = [];
        for (let metaDef of meta_definitions) {
            const sid = metaDef.sid;
            if (sid !== "id") {
                row.push(<td>{stock[sid]}</td>);
            }
        }
        rows.push(<tr>{row}</tr>);
    }
return rows;

};

//A helper the Table component will use in its render method;
function buildTable() {
   /* let rows = [<tr>
  <td>Gold</td>
  <td>Silver</td>
  </tr>,
        <tr>
  <td>1300</td>
  <td>230</td>
  </tr>
    ];*/
    const rows = buildRows();
    return <table>{rows}</table>
};

export {
    buildTable
};