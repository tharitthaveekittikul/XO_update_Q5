import React from "react";

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.Ninput.value)
      }

    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <label>
                n board:
                <input type="number" name="Ninput"value={this.props.value} required onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default InputForm;