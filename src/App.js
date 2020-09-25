import React from 'react';
import './App.css';


export default class GameOfLife extends React.Component {   
    constructor(props) {
        super(props);

        this.state = {
            cells: this.initializeCells(),
            isGameRunning: false,
        };

        setInterval(() => this.live(), 200)
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

        for (let columnIndex = 0; columnIndex < GameOfLife.field.columnsAmount; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < GameOfLife.field.rowsAmount; rowIndex++) {
                cells[columnIndex][rowIndex] = GameOfLife.cellState.DEAD;
            }
        }

        return cells;
    }
  
   // start game
    live() {
        if (!this.state.isGameRunning) {
            return;
        }

        const newCells = [];

        for (let columnIndex = 0; columnIndex < GameOfLife.field.columnsAmount; columnIndex++) {
            newCells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < GameOfLife.field.rowsAmount; rowIndex++) {
                newCells[columnIndex][rowIndex] = this.computeNewCellState(columnIndex, rowIndex)
            }
        }

        this.setState({cells: newCells})
    }

    // find new cell state after comparing to neighbor's cell state
    computeNewCellState(columnIndex, rowIndex) {
        const aliveNeighboursAmount = this.computeAliveNeighboursAmount(columnIndex, rowIndex);
        const currentCellState = this.state.cells[columnIndex][rowIndex];

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
    computeAliveNeighboursAmount(columnIndex, rowIndex) {
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

            let newColumnOffset = columnIndex + xOffset;
            let newRowOffset = rowIndex + yOffset;

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
    toggleCellState(columnIndex, rowIndex) {
        const newCellsState = this.state.cells;

        newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];

        this.setState({state: newCellsState})
    }

    // turn game on or off
    toggleIsGameRunning() {
        this.setState({isGameRunning: !this.state.isGameRunning})
    }

 
    // create grid
    renderCells() {
        return (
            <div className="cells">
                {this.state.cells.map((rows, columnIndex) => {
                    return this.renderColumn(rows, columnIndex)
                })}
            </div>
        );
    }

    // change cells upon user input & toggle cell state
    renderColumn(rows, columnIndex) {
        return (
            <div className="cols" key={`column_${columnIndex}`}>
                {rows.map((cellState, rowIndex) => {
                    const cellModifier = cellState === GameOfLife.cellState.DEAD ? 'dead' : 'alive';
                    return <div
                        className={`cells cells--${cellModifier}`}
                        key={`cell_${columnIndex}_${rowIndex}`}
                        onClick={() => this.toggleCellState(columnIndex, rowIndex)}
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