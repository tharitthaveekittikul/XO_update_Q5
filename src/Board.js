import Square from "./Square";
import React from "react";

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: "3" }; //default board
    this.handleChange = this.handleChange.bind(this);
}

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i} //prevent click on box and change all boxes
      />
    );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  runCallback = () => {
    const board_row = [];
    const total_html = [];
    let index = 0;
    for (var i = 0; i < this.state.value ; i++){
      board_row.push([])
      total_html.push(<div className="board-row" key={i}>
      {board_row[i]}
      </div>)
      for( var j = 0 ; j < this.state.value ; j++){
        board_row[i].push(this.renderSquare(index));
        index++;
      }
    }

    return total_html;
  }

  render() {  
    let call = this.runCallback()
      return (
        
        <div>
          <form>
              <label>
                n board:
                <input type="number" name="Ninput" value={this.props.value} required onChange={this.handleChange}/>
              </label>

          </form>

          {call}
        </div>
      );
  }
}

export default Board;