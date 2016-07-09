/// <reference path="../typings/index.d.ts" />

export class DateInput extends React.Component<any, any> {
    render(){
        return(<input type='text' placeholder={this.props.placeholder}/>);
    }
    
}