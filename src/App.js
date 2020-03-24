import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      history: [{
        squares: ['','','','','','','','','']
      }],
      xIsNext: false, //false is X, true is O
    }
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let i=0; i<lines.length; i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }
    } return null;
  }

  onSquareClicked = (i) => {
    const history = this.state.history;
    console.log('history:', history);
    const current = history[history.length - 1];
    console.log('current:', current);
    const squareList = current.squares.slice();
    if(this.calculateWinner(squareList) || squareList[i]){
      return;
  }
    squareList[i]=this.state.xIsNext?"O":"X";
    console.log(`squareList[${i}]`, squareList[i])
    this.setState({
      history: history.concat([{
        squares: squareList,
      }]),
      xIsNext: !this.state.xIsNext
    });
    console.log('xIsNext:',this.state.xIsNext)
}

  render(){
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = this.calculateWinner(current.squares);

    let status = '';  

    if(winner){
        status = `Winner is ${winner}!`;
        console.log('Winner is:', winner);
    } else {
        status = this.state.xIsNext?`NextPlayer is O`:`NextPlayer is X`
    }


    return (
      <div>
        <h1>Tic Tac Toe</h1>
        {/* <Board squares={this.state.squares} nextPlayer={this.state.nextPlayer} setParentsState={this.setParentsState}/> */}
        <Board {...this.state} status={status} squareList={current.squares} onClick={(i)=>this.onSquareClicked(i)} calculateWinner={this.calculateWinner}/>
      </div>
    );
  }

}

export default App;
