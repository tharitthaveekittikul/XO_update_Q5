import Board from "./Board"
import React from "react";

function calculateWinner(squares,nboard) {
  // console.log(nboard)  
  const lines = [];
  let index = 0;
  let startlines = 0;
  nboard = parseInt(nboard);
  const pattern = parseInt((nboard*2)+2) // รูปแบบของการชนะ
  
  for (let i = startlines ; i < nboard ; i++){
    lines.push([])
    // แนวนอน
    for(let j = index ; j < nboard * nboard ; j++){
      console.log("index " +index)
      // lines[i].push(nboard-(j+1));
      // console.log(nboard-(j+1))
      lines[i].push(j);
      // console.log(lines[i])
      if(j % nboard == nboard-1){ // หาเเถวต่อไป
        // console.log("break")
        break;
      }
    }
    index = parseInt(index) + parseInt(nboard); //หาแถวต่อไปเหมือนกัน
    console.log("Index "+index)
    // console.log("B"+startlines)
    startlines++;
    // console.log("A"+startlines)
    console.log("lines นอน " + lines[i])
  }

  // console.log(startlines)
  // แนวตั้ง
  startlines = parseInt(nboard);
  index = 0;
  if(nboard == 3){
    for (let i = startlines ; i <= pattern-startlines; i++){
      lines.push([])
      for(let j = index ; j < nboard * nboard ; j+=parseInt(nboard)){
        lines[i].push(j); 
        console.log(j)
      }
      index = index + 1;
      console.log("index " + index)
      console.log("i "+ i)
      console.log("lines ตั้ง " + lines[i])
    }
  }
  else{
    for (let i = startlines ; i <= pattern-startlines+1; i++){
      lines.push([])
      for(let j = index ; j < nboard * nboard ; j+=parseInt(nboard)){
        lines[i].push(j); 
        console.log(j)
      }
      index = index + 1;
      console.log("index " + index)
      console.log("i "+ i)
      console.log("lines ตั้ง " + lines[i])
    }
  }
  

  // แนวทเเยงซ้าย
  // startlines = nboard * 2;
  index = 0;
  let temp = [];
  for(let j = parseInt(index) ; j < nboard * nboard ; j+=parseInt(nboard+1)){
    // console.log("this : " + j);
    temp.push(j);
  }
  lines.push(temp);
  // for(let i = startlines ; i == parseInt(nboard*2) ; i++){
  //   lines.push([])
  //   for(let j = parseInt(index) ; j < nboard * nboard ; j+=parseInt(nboard+1)){
  //     // console.log("this : " + j);
  //     temp.push(j);
  //   }
  //   console.log("lines ทแยงขวา " + lines[i])
  // }

  // แนวทเเยงขวา
  // startlines = nboard * 2;
  index = nboard-1;
  temp = [];
  for(let j = parseInt(index) ; j <= nboard*(nboard - 1) ; j+=parseInt(nboard-1)){
    // console.log("this : " + j);
    temp.push(j);
  }
  lines.push(temp);
  // startlines = parseInt(nboard * 2 + 1);
  // index = parseInt(nboard)-1;
  // for(let i = startlines ; i == nboard *2 +1 ; i++){
  //   lines.push([])
  //   for(let j = index ; j <= nboard*(nboard - 1) ; j+=parseInt(nboard-1)){
  //     lines[i].push(j);
  //   }
  //   console.log("lines ทแยงซ้าย " + lines[i])
  // }

  console.log(lines)
  
  // นำ lines มาเช็คเงื่อนไขต่อว่าเหมือนกัน?
  let count_x = 0;
  let count_o = 0;

  for(let i = 0; i < lines.length ; i++){
    console.log(lines[i])
    // if( lines[i].length == 0){
    //   continue;
    // }
    for(let j = 1; j < lines[i].length ; j++){ // เทียบที่ index 0 เสมอ
      if(squares[lines[i][0]] == "X" && squares[lines[i][0]] === squares[lines[i][j]] ){
        count_x++;
        if(count_x == nboard - 1){
          console.log("win this X"+lines[i])
          return "X"
        }
      }
      else{
        count_x = 0;
        break;
      }
    }

    for(let j = 1; j < lines[i].length ; j++){ // เทียบที่ index 0 เสมอ
      if(squares[lines[i][0]] == "O" && squares[lines[i][0]] === squares[lines[i][j]] ){
        count_o++;
        if(count_o == nboard - 1){
          console.log("win this O"+lines[i])
          return "O"
        }
      }
      else{
        count_x = 0;
        break;
      }
    }
  }
  return null;
}


class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          value: 3
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares,this.state.value) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
      this.setState({

        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    handleChange(event) {
      let n = parseInt(event.target.value);
      this.setState({
        history: [{
          squares: Array(n * n).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        value: event.target.value});
      // console.log(event.target.value)
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares,this.state.value);

        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });

        let status;
        if (winner) {
        status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (

            <div className="game">
              <form>
                <label>
                  n board:
                  <input type="number" name="nInput" value={this.state.value} onChange={this.handleChange}/>
                </label>
              </form>
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                  nboard = {this.state.value}
                />
              </div>
              <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
              </div>
            </div>
        );
    }
  }

export default Game;