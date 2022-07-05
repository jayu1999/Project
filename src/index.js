//import packages 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// this statement creates an inheritance to react gives you comp access to react
// They serve the same purpose as JavaScript functions, but work in isolation and return HTML via a render() function.
class Square extends React.Component {

  // render use to display the specified html code inside the specified  html element.
  // render() method  we can read props and state and return our JSX code to the root comp of our app
  render() {

    // Return Static JSX Content to a Variable
    return (

    // onclick button use for validation , warnings etc, and onclick fun do- executes a certain functionality when a button is clicked.
    // and arrow function (=>) use in creating succinst one line operation
    // in map ,filter. this keyword always represents the object that defined the arrow function.
    // parameter variable deaclared as local variable X
    // Square's render method to set the state "value" to 'X' (instead of displaying the alert popup).
      <button className="square" onClick={() =>  this.props.onClick()({value: 'X'})}
      >


   {/* this keyword is used to react for classes  and props access in this keyword using this 
   {/* keyword to others arguments * and props it is way to pass data betn compoents by using props
   its is unidirectional flow (one way to from parent to child )*/}
         {this.props.value}
      </button>
    );
  }
}

// define a class name board and extending component will give access to function like did mount & did update comp.
// using the extends keyword, you can allow the current comp to access all comp's properties including fuction.
class Board extends React.Component {
  // Parameters, Where is used, what does it do?


// Add the property called "value" to the Square, assigning it the value of i.
  renderSquare(i) {
    return (
      // The state.squares array in this example represents the current value on the Board. 
      <Square

        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      // 
      <div>
      {/* div class name= board row  */}
        <div className="board-row">

          {/* */}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // during component creation and before mounting. and constructor add to the class to intialize the state.
  constructor(props) {


    // super is defining the constructor of sub class. When implementing the constructor for a React.
    // Component subclass, you should call super(props) before any other statement
    super(props);

  //  use for data store 
    this.state = {
      history: [{

        // this constructor and initialise it with an array of 9 null values.
        squares: Array(9).fill(null)
      }],

      stepNumber: 0,


      // Boolean fun which plays goes next
      xIsNext: true 
    };
  }
  
  // Parameters, Where is used, what does it do?
  //  handclick method is defned as an instance method which changes the local state 
  // handleclick flip the value in prop and pass to board
  handleClick(i) {
    console.log("handleClick" + i );
    // The history array represents all the board states, from the first move to the last move.
    // const is parameter and declared a value history
     const history = this.state.history.slice(0, this.state.stepNumber + 1);
    //  line of code to initialise a current array.
     const current = history[history.length - 1];
     const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // the concat() method is used to merge two or more arrays
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,

      // XISNEXT  is a boolean fun  which plays goes next
      xIsNext: !this.state.xIsNext,
    });
  }

  // jump is use to jump other screen using index and stepper compoents movement is limited to next and previous steps only
  jumpTo(step) {

    // setstate  in component react automatically updates the child compo
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // const is a signal that the variable wont'be reassigned
    // use const by default and its value can never change , const has a block scope.
    // history array being iterated by the map func
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // .map()is array method allows a run a func on each item in the array
    // move variable is the index of the current element
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

  
  //  let is parameter and status is which player has a next turn check
  // use let only if rebinding is needed
  // let is signal that he variable may be assigned
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}

            // property called "OnClick" to the Square, assigning it to the HandleClick method.
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          {/* status check which player has a next turn */}
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
// createroots() controls the contents of the container node you pass in.
// render the whole react app into element with id=root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

// function start 
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // const is variable and assign a parameters 
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
