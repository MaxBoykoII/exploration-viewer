/// <reference path="../typings/index.d.ts" />

import {buildTable} from '../modules/data-module';

export class Table extends React.Component < any, any > {
    render() {
        return (<div>
    {buildTable()}
    </div>);
    };
}