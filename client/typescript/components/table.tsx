/// <reference path="../typings/index.d.ts" />

import {
    buildTable,
    fetch
}
from '../modules/data-module';
import {
    getValidDates,
    _submit
}
from '../modules/date-module'

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
            'valid_dates': [],
            'stocks': [],
            'meta_definitions': []
        };
    }
    componentWillMount() {
        fetch.call(this, this.state.current_date);
        getValidDates.call(this);
    }
    
    render() {
        const lastIndex = this.state.valid_dates.length - 1;

        return (<div> 
        <p>The current date for this table instance is {this.state.current_date}</p>
        <DateInput className="form-control" 
                   placeholder={this.state.current_date} 
                   min={this.state.valid_dates[0]} 
                   max={this.state.valid_dates[lastIndex]}
                   submitCallback = {_submit.bind(this)}/>
    {buildTable(this.state.stocks, this.state.meta_definitions, this.state.future_dates)}
    </div>);
    };
}