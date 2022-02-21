import Square from "./Square";
import React from "react";

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i} //prevent click on box and change all boxes
      />
    );
  }

  runCallback = () => {
    const board_row = [];
    const total_html = [];
    let nboard = this.props.nboard
    let index = 0;
    for (var i = 0; i < nboard ; i++){
      board_row.push([])
      total_html.push(<div className="board-row" key={i}>
      {board_row[i]}
      </div>)
      for( var j = 0 ; j < nboard ; j++){
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
          {call}
        </div>
      );
  }
}

export default Board;