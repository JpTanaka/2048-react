import React, { useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom';

function generaterandomnumber(matrix) {
    const ind = Math.random();
    var counter = 0;
    var dict = {}
    for (let j=0; j<matrix.length; j++) {
      for(let i = 0; i<matrix[j].length; i++) {
        if (matrix[j][i] == 0) {
          //console.log(i, j);
          dict[counter] = [i,j];
          counter++;
        }
      }
    }
    return [dict[Math.floor(counter*ind)][1],dict[Math.floor(counter*ind)][0]]
}

function mergesquares(e, matrix) {
  let played = false;
  //matrix = Array(4).fill().map(()=> Array(4).fill(0));
  //matrix[0] = [0,2,0,0];
  switch (e.code) {
    case "ArrowLeft":
      for (let i=0; i<matrix.length; i++) {
        let pointer = -1;
        for(let j=0; j<matrix[i].length; j++) {
          //Pointer aponta um a menos que o primeiro número maior que zero.
          
          if(matrix[i][j] != 0) {
            console.log(i, j, matrix[i][j], pointer);
            matrix[i][pointer+1] = matrix[i][j];
            if(j!=(pointer+1)){
              matrix[i][j] = 0;
              played = true;
            }
            pointer++;
            for(let k = pointer+1; k<matrix[i].length; k++) {
              if (matrix[i][k] !=0) {
                console.log(matrix[i], k, pointer);
                if (matrix[i][k] == matrix[i][pointer]) {
                  matrix[i][pointer] +=matrix[i][pointer];
                  matrix[i][k] = 0;
                  break;
                }
                console.log(matrix[i], k, pointer);
                if((pointer+1) != k){
                matrix[i][pointer+1] = matrix[i][k];
                matrix[i][k]=0;
                played = true;
              }
                console.log(matrix[i], k, pointer, "aaa");
                break;
              }
            }
            
          }
          }
        }
      
      console.log("esquerda");
      break;
    case "ArrowUp":
      console.log("aa");
      return;
    default:
      console.log("bbb");
  }
  return matrix;
}

function SquaresBoard() {
  
}
// You pressed a key. ArrowLeft
// App.js:34 You pressed a key. ArrowUp
// App.js:34 You pressed a key. ArrowRight
// App.js:34 You pressed a key. ArrowDown

function Board () {
  function handleKeyPress(e) {
    console.log( "You pressed a key.",e.code)
    let merged = mergesquares(e, matrix);
    setMatrix(merged);
    const array = generaterandomnumber(matrix);
    let copya = [...matrix];
    copya[array[0]][array[1]] = 2;
    setMatrix(copya);
    //console.log(matrix[array[0]][array[1]])
  }
  const [matrix, setMatrix] = useState(Array(4).fill().map(()=> Array(4).fill(0)));
  console.log(matrix[0]);
  return  (
    <div className="board-container">
      <div className="board" onKeyDown={(e) => handleKeyPress(e)} tabIndex={-1}>
      <input type="hidden" onKeyPress={(e) => handleKeyPress(e)} />
      <div className="board-row">
        <Square num = {matrix[0][0]} />
        <Square num = {matrix[0][1]} />
        <Square num = {matrix[0][2]} />
        <Square num = {matrix[0][3]} />
      </div>
      <div className="board-row">
        <Square num = {matrix[1][0]} />
        <Square num = {matrix[1][1]} />
        <Square num = {matrix[1][2]} />
        <Square num = {matrix[1][3]} />
      </div>
      <div className="board-row">
        <Square num = {matrix[2][0]} />
        <Square num = {matrix[2][1]} />
        <Square num = {matrix[2][2]} />
        <Square num = {matrix[2][3]} />
      </div>
      <div className="board-row">
        <Square num = {matrix[3][0]} />
        <Square num = {matrix[3][1]} />
        <Square num = {matrix[3][2]} />
        <Square num = {matrix[3][3]} />
      </div>
      </div>
    </div>
  )
}

function Square(props) {
  let className = "square";
  className += " " + "square" + String(props.num) + "color";
  return (
    <div className={className}>{props.num}</div>
  
  )
}



function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);