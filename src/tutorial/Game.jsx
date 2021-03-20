// useStateをimport
import React, { useState } from "react";
// Board（盤面）コンポーネントをimport
import Board from "./Board";

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
const Game = () => {
  //  クラスのconstructor内で `this.state` の初期化をやめて `useState` フックを使う
  //  this.state = {
  //    history: [
  //      {
  //        squares: Array(9).fill(null)
  //      }
  //   ],
  // useState()を使って、関数コンポーネントに状態を持たせる
  // const [state変数, set関数] = useState(初期値)
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);
  // stepNumber: 0,
  const [stepNumber, setStepNumber] = useState(0);
  // xIsNext: true
  const [xIsNext, setXIsNext] = useState(true);
  //     };
  //   }

  // handleClick(i) {
  const handleClick = i => {
    // const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const historyCurrent = history.slice(0, stepNumber + 1);
    // const current = history[history.length - 1];
    const current = historyCurrent[historyCurrent.length - 1];
    // const squares = current.squares.slice();
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // squares[i] = this.state.xIsNext ? "X" : "O";
    squares[i] = xIsNext ? "X" : "O";
    //this.setState({
    //  history: history.concat([
    //    {
    //      squares: squares
    //    }
    //  ]),

    setHistory([...historyCurrent, { squares }]);
    // stepNumber: history.length,
    setStepNumber(historyCurrent.length);
    // xIsNext: !this.state.xIsNext
    setXIsNext(!xIsNext);
  };
  //   });
  // }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0
  //   });
  // }

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  // render() {
  // const history = this.state.history;
  // const current = history[this.state.stepNumber];
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : `Go to game start`;
    return (
      <li key={move}>
        {/* <button onClick={() => this.jumpTo(move)}>{desc}</button> */}
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner : ${winner}`;
  } else {
    // status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    status = `Next Player : ${xIsNext ? "X" : "O"}`;
  }
  return (
    <div className="game">
      <div className="game-board">
        {/* <Board squares={current.squares} onClick={i => this.handleClick(i)} /> */}
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
  // }
};

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;