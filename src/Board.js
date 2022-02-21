import Square from "./Square";
import React from "react";

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '3'};
}

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.Ninput.value)
  }

  runCallback = () => {
    const n = [];
    for (var i = 0; i < this.state.value ; i++){
      n.push(<div className="board-row" key={i}>);
      for (var j = 0 ; j < this.state.value ; j++){
        n.push({this.renderSquare(j)});
      }
      n.push(</div>)
    }
    return n;
  }

  render() {  
      return (
        
        <div>
          <form onSubmit={this.handleSubmit}>
              <label>
                n board:
                <input type="number" name="Ninput"value={this.props.value} required onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>
          {
            runCallback(() => {
              const n = [];
              for (var i = 0; i < this.state.value ; i++){
                n.push(<div className="board-row" key={i}>);
                for (var j = 0 ; j < this.state.value ; j++){
                  n.push({this.renderSquare(j)});
                }
                n.push(</div>)
              }
              return n;
            })
          }
        </div>
      );
  }
}

export default Board;