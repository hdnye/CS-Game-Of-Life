import React from 'react';
import './App.css';


const cell = 20;
const width = 800;
const height = 600;

class App extends React.Component {
  constructor() {
    super();
    this.rows = height / cell;
    this.cols = width / cell;
    this.grid = this.initializeGrid();

    this.state = {
      cells: [],
      gameRunning: false,
    };
    setInterval(() => this.running(), 100);
  }

  static cellState = {
    alive: true,
    dead: false,
  };

  // create grid
  initializeGrid() {
    let grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        grid[i][j] = false;
      }
    }
    return grid;
  }

  // populate grid with cells
  initalizeCells() {
    let cells = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j]) {
          cells.push({ i, j });
        }
      }
    }
    return cells;
  }

  // if game is running
  running() {
    if (!this.state.gameRunning) {
      return;
    }
    const newCells = [];
    for (let i = 0; i < this.cols; i++) {
      newCells[i] = [];
      for (let j = 0; j < this.rows; j++) {
        newCells[i][j] = this.findCellNeighborState(i, j);
      }
    }
    this.setState({ cells: newCells });
  }

  // find cell neighbor state
  findCellNeighborState() {
    const aliveNeighbors = this.findCellState(this.rows, this.cols);
    const curCellState = this.state.cells[this.rows][this.cols];

    if (curCellState === this.cellState.alive) {
      if (aliveNeighbors < 2) {
        return this.cellState.dead;
      } else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
        return this.cellState.alive;
      } else if (aliveNeighbors > 3) {
        return this.cellState.dead;
      }
    } else {
      if (aliveNeighbors === 3) {
        return this.cellState.alive;
      }
    }
    return this.cellState.dead;
  }
// find cell state
  findCellState() {
    let aliveNeighbors = 0;

    const neighborStates = [
      [-1, 0], // left
      [-1, 1], // top left
      [0, 1], // top
      [1, 1], // top right
      [1, 0], // right
      [1, -1], // bottom right
      [0, -1], // bottom
      [-1, -1], // bottom left
    ];

    for (const neighborStatesKey in neighborStates) {
      const [xStates, yStates] = neighborStates[neighborStatesKey];

      let newColState = this.cols + xStates;
      let newRowState = this.rows + yStates;

      if (newColState < 0 || newColState > this.cols - 1) {
        continue;
      }
      if (newRowState < 0 || newRowState > this.rows - 1) {
        continue;
      }

      const neighState = this.state.cells[newColState][newRowState];
      if (neighState === this.cellState.alive) {
        aliveNeighbors++;
      }
    }
    return aliveNeighbors;
  }
  // toggle cell states
  toggleCellState(rows, cols) {
    const newCellState = this.state.cells;

    newCellState[rows][cols] = !newCellState[rows][cols];
    this.setState({ state: newCellState });
  }

  // start/stop game 
  startGameButton() {
    const buttonLabel = this.state.gameRunning ? "Stop" : "Start";

    return (
      <button className="Button" onClick={() => this.running()}>
        {buttonLabel}
      </button>
    );
  }

  render() {
    return (
      <div className="App">
        Game Of Life
        <div className="bodyContainer">{this.startGameButton()}</div>
        <div className="gridContainer">
          <div
            className="Grid"
            style={{
              width: width,
              height: height,
              backgroundSize: `${cell}px ${cell}px`,
            }}
          ></div>
        </div>
      </div>
    );
  }
}


export default App;
