import React, { useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { useEffect, useRef  } from "react";

// function ({ name }) => {
//   useEffect(() => {
//     function handleKeyDown(e) {
//       console.log(e.keyCode);
//     }

//     document.addEventListener('keydown', handleKeyDown);

//     // Don't forget to clean up
//     return function cleanup() {
//       document.removeEventListener('keydown', handleKeyDown);
//     }
//   }, []);

//   return <div>Keydown</div>;
// };


function generaterandomnumber(matrix) {
    const ind = Math.random();
    var counter = 0;
    var dict = {}
    for (let j=0; j<matrix.length; j++) {
      for(let i = 0; i<matrix[j].length; i++) {
        if (matrix[j][i] == 0) {
          dict[counter] = [i,j];
          counter++;
        }
      }
    }
    return [dict[Math.floor(counter*ind)][1],dict[Math.floor(counter*ind)][0]]
}

function mergesquares(e, matrix) {
  let played = false;
  var copya = [];
for (var i = 0; i < matrix.length; i++)
    copya[i] = matrix[i].slice();
  switch (e.code) {
     case "ArrowLeft":
      for (let i=0; i<matrix.length; i++) {
        let pointer = 0;
        let arr = Array(matrix[i].length).fill(0);
        for(let j=0; j<matrix[i].length; j++) {
          if(matrix[i][j] != 0) {
            if (arr[pointer]==0) {
              arr[pointer] = matrix[i][j];
            }
            else if(matrix[i][j] == arr[pointer] && j!=pointer) {
              arr[pointer]*=2;
              matrix[i][j]=0;
              pointer++;
            }
            else if(matrix[i][j] != arr[pointer] && arr[pointer] !=0) {
                arr[pointer+1] = matrix[i][j];
                matrix[i][j] = 0;
                pointer++;
            }
          }
          }
          for(let j=0;j<matrix[i].length; j++) {
            if(copya[i][j] != arr[j]) played=true; 
          }
          matrix[i]=arr;
        }
      break;
    case "ArrowUp":
      //j is the collum of the matrix
        for(let j=0; j<matrix[0].length; j++) {
          let pointer = 0;
          let arr = Array(matrix.length).fill(0);
          for(let i=0; i<matrix.length; i++) {
            if(matrix[i][j] != 0) {
              if (arr[pointer]==0) {
                arr[pointer] = matrix[i][j];
              }
              else if(matrix[i][j] == arr[pointer] && i!=pointer) {
                arr[pointer]*=2;
                matrix[i][j]=0;
                pointer++;
              }
              else if(matrix[i][j] != arr[pointer] && arr[pointer] !=0) {
                  arr[pointer+1] = matrix[i][j];
                  matrix[i][j] = 0;
                  pointer++;
              }
            }
          }
          for(let i=0;i<matrix.length; i++) {
          if(copya[i][j] != arr[i]) played=true; 
        }
          for(let i=0; i<matrix.length; i++) {
            matrix[i][j] = arr[i];
          }
        }
        
        break;
    case "ArrowDown":
      //j is the collum of the matrix
      for(let j=0; j<matrix[0].length; j++) {
        let pointer = matrix[0].length-1;
        let arr = Array(matrix.length).fill(0);
        for(let i=matrix[0].length-1; i>=0; i--) {
          if(matrix[i][j] != 0) {
            if (arr[pointer]==0) {
              arr[pointer] = matrix[i][j];
            }
            else if(matrix[i][j] == arr[pointer] && i!=pointer) {
              arr[pointer]*=2;
              matrix[i][j]=0;
              pointer--;
            }
            else if(matrix[i][j] != arr[pointer] && arr[pointer] !=0) {
                arr[pointer-1] = matrix[i][j];
                matrix[i][j] = 0;
                pointer--;
            }
          }
        }
        for(let i=0;i<matrix.length; i++) {
        if(copya[i][j] != arr[i]) played=true; 
      }
        for(let i=0; i<matrix.length; i++) {
          matrix[i][j] = arr[i];
        }
      }
      
      break;
    case "ArrowRight":
      for (let i=0; i<matrix.length; i++) {
        let pointer = matrix[i].length-1;
        let arr = Array(matrix[i].length).fill(0);
        for(let j=matrix[i].length-1; j>=0; j--) {
          if(matrix[i][j] != 0) {
            if (arr[pointer]==0) {
              arr[pointer] = matrix[i][j];
            }
            else if(matrix[i][j] == arr[pointer] && j!=pointer) {
              arr[pointer]*=2;
              matrix[i][j]=0;
              pointer--;
            }
            else if(matrix[i][j] != arr[pointer] && arr[pointer] !=0) {
                arr[pointer-1] = matrix[i][j];
                matrix[i][j] = 0;
                pointer--;
            }
          }
        }
        for(let j=0;j<matrix[i].length; j++) {
          if(copya[i][j] != arr[j]) played=true; 
        }
        matrix[i]=arr;
      }
    default:
      return [matrix, played];
  }
  return [matrix, played];
}

function SquaresBoard() {
  
}
function IsNew(newsquare, square) {
  return (newsquare[0]==square[0] && newsquare[1]==square[1])
}


var first = true;
function Board ({ onKeyDown }) {
  const handleKeyDown = (e) => {
    var probability = function(n) {
      return !!n && Math.random() <= n;
    };
    let played = false;
    let data = mergesquares(e, matrix);
    let merged = data[0];
    played = data[1];
    setMatrix(merged);
    if(first==true||played==true) {
    const array = generaterandomnumber(matrix);
    let copya = [...matrix];
    if(probability(0.8)) {
    copya[array[0]][array[1]] = 2;
    }
    else {
      copya[array[0]][array[1]] = 4;
    }
    setMatrix(copya);
    setNewsquare(array)
    first = false;
    }
  }

  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)
  let classNameboard = "board-row " + (focused ? "focus" : "no-focus");
  const [newsquare, setNewsquare] = useState([0,0]);
  const [matrix, setMatrix] = useState(Array(4).fill().map(()=> Array(4).fill(0)));
  return  (
    <div className="board-container">
      
      <div className="board" onKeyDown={(e) => handleKeyDown(e)} tabIndex={-1} onFocus={onFocus} onBlur={onBlur}>
      { !focused &&
        <div className="focusmessage">Click me!</div>
        }
      <input type="hidden" />
      <div className={classNameboard}>
        <Square num = {matrix[0][0]} new = {IsNew(newsquare, [0,0])} />
        <Square num = {matrix[0][1]} new = {IsNew(newsquare, [0,1])}/>
        <Square num = {matrix[0][2]} new = {IsNew(newsquare, [0,2])}/>
        <Square num = {matrix[0][3]} new = {IsNew(newsquare, [0,3])}/>
      </div>
      <div className={classNameboard}>
        <Square num = {matrix[1][0]} new = {IsNew(newsquare, [0,0])}/>
        <Square num = {matrix[1][1]} new = {IsNew(newsquare, [1,1])}/>
        <Square num = {matrix[1][2]} new = {IsNew(newsquare, [1,2])}/>
        <Square num = {matrix[1][3]} new = {IsNew(newsquare, [1,3])}/>
      </div>
      <div className={classNameboard}>
        <Square num = {matrix[2][0]} new = {IsNew(newsquare, [2,0])}/>
        <Square num = {matrix[2][1]} new = {IsNew(newsquare, [2,1])}/>
        <Square num = {matrix[2][2]} new = {IsNew(newsquare, [2,2])}/>
        <Square num = {matrix[2][3]} new = {IsNew(newsquare, [2,3])}/>
      </div>
      <div className={classNameboard}>
        <Square num = {matrix[3][0]} new = {IsNew(newsquare, [3,0])}/>
        <Square num = {matrix[3][1]} new = {IsNew(newsquare, [3,1])}/>
        <Square num = {matrix[3][2]} new = {IsNew(newsquare, [3,2])}/>
        <Square num = {matrix[3][3]} new = {IsNew(newsquare, [3,3])}/>
      </div>
      </div>
    </div>
  )
}

function Square(props) {
  let className = "square";
  className += " " + "square" + String(props.num) + "color" + " " + (props.new ? "new" : "old");
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