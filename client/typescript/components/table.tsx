/// <reference path="../typings/index.d.ts" />

import {
    buildTable,
    fetch
}
from '../modules/data-module';

export class Table extends React.Component < any, any > {
    constructor() {
        super();
        this.state = {
            'current_date': '2016-02-02',
            'future_dates': [],
            'stocks': [],
            'meta_definitions': []
        };
        console.log("Constructor called!...");
    };
    componentWillMount() {
        fetch.call(this, this.state.current_date);
        console.log('request made!');
    }
    render() {
        return (<div> <p>The current date for this table instance is {this.state.current_date}</p>
    {buildTable(this.state.stocks, this.state.meta_definitions, this.state.future_dates)}
    </div>);
    };
}