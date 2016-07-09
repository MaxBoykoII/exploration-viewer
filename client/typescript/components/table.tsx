/// <reference path="../typings/index.d.ts" />

import {
    buildTable,
    fetch
}
from '../modules/data-module';

import {
    DateInput
}
from './date-input';



export class Table extends React.Component < any, any > {
    constructor() {
        super();
        this.state = {
            'current_date': '2016-02-02',
            'future_dates': [],
            'stocks': [],
            'meta_definitions': []
        };
    };
    componentWillMount() {
        fetch.call(this, this.state.current_date);
    }
    render() {
        return (<div> <p>The current date for this table instance is {this.state.current_date}</p>
        <DateInput className="form-control" placeholder={this.state.current_date}/>
    {buildTable(this.state.stocks, this.state.meta_definitions, this.state.future_dates)}
    </div>);
    };
}