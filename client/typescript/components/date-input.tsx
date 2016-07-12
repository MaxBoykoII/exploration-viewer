/// <reference path="../typings/index.d.ts" />

export class DateInput extends React.Component < any, any > {
    render() {
        const range = (this.props.min && this.props.max) ? <p> Range: {`${this.props.min} to ${this.props.max}`} </p> : null;
        return (<form>
            <input type='text' id="date-input" placeholder={this.props.placeholder}/> <button className="btn btn-primary" onClick={this.props.submitCallback}>Submit</button>
            {range}
            </form>);
    }

}