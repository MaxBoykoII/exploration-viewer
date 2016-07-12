/// <reference path="../typings/index.d.ts" />

export class DateInput extends React.Component < any, any > {
    flag(event) {
        let input = jQuery(event.target);
        const invalid = isNaN(Date.parse(jQuery(event.target).val()));
        if (invalid && input.hasClass('valid')) {
            input.removeClass('valid').addClass('invalid');
        }
        else if (invalid) {
            input.addClass('invalid');
        }
        else if (!invalid && input.hasClass('invalid')) {
            input.removeClass('invalid').addClass('valid');
        }
        else if (!invalid) {
            input.addClass('valid');
        }

    }
    render() {
        const range = (this.props.min && this.props.max) ? <p> Range: {`${this.props.min} to ${this.props.max}`} </p> : null;
        return (<form>
            <input type='text' id="date-input" placeholder={this.props.placeholder} onChange={this.flag.bind(this)}/> <button className="btn btn-primary" onClick={this.props.submitCallback}>Submit</button>
            {range}
            </form>);
    }

}