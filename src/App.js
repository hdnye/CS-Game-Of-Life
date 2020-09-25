import React from 'react';
import './App.css';


export default class GameOfLife extends React.Component {   
    constructor(props) {
        super(props);

        this.state = {
            cells: this.initializeCells(),
            isGameRunning: false,
        };

        setInterval(() => this.isLive(), 200)
    }

  // Set static properties
  static field = {
    columnsAmount: 61,
    rowsAmount: 41,
  };
  static cellState = {
    ALIVE: true,
    DEAD: false,
  };

  // create cell structure for grid
    initializeCells() {
        let cells = [];

        for (let cols = 0; cols < GameOfLife.field.columnsAmount; cols++) {
            cells[cols] = [];
            for (let rows = 0; rows < GameOfLife.field.rowsAmount; rows++) {
                cells[cols][rows] = GameOfLife.cellState.DEAD;
            }
        }

        return cells;
    }
  
   // start game
    isLive() {
        if (!this.state.isGameRunning) {
            return;
        }

        const newCells = [];

        for (let cols = 0; cols < GameOfLife.field.columnsAmount; cols++) {
            newCells[cols] = [];
            for (let rows = 0; rows < GameOfLife.field.rowsAmount; rows++) {
                newCells[cols][rows] = this.findCellState(cols, rows)
            }
        }

        this.setState({cells: newCells})
    }

    // find new cell state after comparing to neighbor's cell state
    findCellState(cols, rows) {
        const aliveNeighboursAmount = this.findNeighborState(cols, rows);
        const currentCellState = this.state.cells[cols][rows];

        if (currentCellState === GameOfLife.cellState.ALIVE) {
            if (aliveNeighboursAmount < 2) {
                return GameOfLife.cellState.DEAD;
            } else if (aliveNeighboursAmount === 2 || aliveNeighboursAmount === 3) {
                return GameOfLife.cellState.ALIVE;
            } else if (aliveNeighboursAmount > 3) {
                return GameOfLife.cellState.DEAD;
            }
        } else {
            if (aliveNeighboursAmount === 3) {
                return GameOfLife.cellState.ALIVE;
            }
        }

        return GameOfLife.cellState.DEAD;
    }

    // find neighbor's cell state
    findNeighborState(cols, rows) {
        let aliveNeighboursAmount = 0;

        const neighbourOffsets = [
            [-1, 0], // left
            [-1, 1], // top left
            [0, 1], // top
            [1, 1], // top right
            [1, 0], // right
            [1, -1], // bottom right
            [0, -1], // bottom
            [-1, -1], // bottom left
        ];

        for (const neighbourOffsetKey in neighbourOffsets) {
            const [xOffset, yOffset] = neighbourOffsets[neighbourOffsetKey];

            let newColumnOffset = cols + xOffset;
            let newRowOffset = rows + yOffset;

            // Check boundaries
            if (newColumnOffset < 0 || newColumnOffset > GameOfLife.field.columnsAmount - 1) {
                continue;
            }
            if (newRowOffset < 0 || newRowOffset > GameOfLife.field.rowsAmount - 1) {
                continue;
            }

            const neighbourState = this.state.cells[newColumnOffset][newRowOffset];
            if (neighbourState === GameOfLife.cellState.ALIVE) {
                aliveNeighboursAmount++;
            }
        }

        return aliveNeighboursAmount;
    }

    // update cells on grid upon cell state change
    toggleCellState(cols, rows) {
        const newCellsState = this.state.cells;

        newCellsState[cols][rows] = !newCellsState[cols][rows];

        this.setState({state: newCellsState})
    }

    // turn game on or off
    toggleIsGameRunning() {
        this.setState({isGameRunning: !this.state.isGameRunning})
    }

 
    // create grid
    renderCells() {
        return (
            <div className="cell">
                {this.state.cells.map((rows, cols) => {
                    return this.renderColumn(rows, cols)
                })}
            </div>
        );
    }

    // change cells upon user input & toggle cell state
    renderColumn(rows, cols) {
        return (
            <div className="cols" key={`column_${cols}`}>
                {rows.map((cellState, rows) => {
                    const cellModifier = cellState === GameOfLife.cellState.DEAD ? 'dead' : 'alive';
                    return <div
                        className={`cells cells--${cellModifier}`}
                        key={`cells_${cols}_${rows}`}
                        onClick={() => this.toggleCellState(cols, rows)}
                    />
                })}
            </div>
        )
    }

    renderStartGameButton() {
        const buttonLabel = this.state.isGameRunning ? 'Stop' : 'Start';

        return (
            <button
                className="Button"
                onClick={() => this.toggleIsGameRunning()}
            >
                {buttonLabel}
            </button>
        )
    }

    render() {
        return (
            <div className="App">
                {this.renderStartGameButton()}
                {this.renderCells()}
            </div>
        );
    };
 }