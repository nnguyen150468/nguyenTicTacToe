import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import FacebookLogin from 'react-facebook-login';

const APP_ID = process.env.REACT_APP_APP_ID;
let startTime = 0;
let endTime = 0;
let TIME_ELAPSED_IN_SECONDS;
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      history: [{
        squares: ['','','','','','','','','']
      }],
      leaderBoard: [],
      stepNumber: 0,
      user: '',
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
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    console.log('history:', history);
    if(this.state.stepNumber===0){
      startTime=Date.now();
      console.log('startTime',startTime);
    }
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
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
    console.log('xIsNext:',this.state.xIsNext)
}

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2)===0
    });
  }

  responseFacebook = (response) => {
    console.log("result from facebook:",response);
    this.setState({user: response.name}); //when we get response from FB, 
  }

  postData =  async (timeScore) => {
    let data = new URLSearchParams();

    data.append("player", this.state.user); //data you want to post (key, value)
    data.append("score", timeScore);

    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    this.getData();
  }

  getData = async () => {
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data from API",data);
    // this.setState({loaderBoard: data.items})
  }

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
      `Go to move # ${move}` : `Go to game start`;
      return (
      <li key={move}>
        <button onClick={()=>this.jumpTo(move)}>{desc}</button>
      </li>
      )
    })

    let status = '';  

    let timeScore;
 
    if(winner){
        timeScore = Math.floor((Date.now()-startTime)/1000);
        this.postData(timeScore);
        status = `Winner is ${winner}!`;
        console.log('Winner is:', winner);
    } else {
        status = this.state.xIsNext?`NextPlayer is O`:`NextPlayer is X`
    }

    if(!this.state.user){
      return (
        <FacebookLogin
        appId={APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook} />
      )
    }
    return (
      <div>     
        <h1>Tic Tac Toe</h1>
        <h2>User info: {this.state.user}</h2>
        <h2>{status}</h2>
        <div className="game-area d-flex justify-content-between">
        <Board {...this.state} status={status} squareList={current.squares} 
        postData={this.postData()}
        onClick={(i)=>this.onSquareClicked(i)} calculateWinner={this.calculateWinner}/>
        <div className="game-info">
            <ol>{moves}</ol>
            <div>Score: {timeScore}</div>
            {/* <div>{this.state.leaderBoard.player}</div>
            <div>{this.state.leaderBoard.score}</div> */}
        </div>
        </div>
        {/* <Board squares={this.state.squares} nextPlayer={this.state.nextPlayer} setParentsState={this.setParentsState}/> */}
       
      </div>
    );
  }

}

export default App;
