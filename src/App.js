import React from 'react';
import './App.css';

export default class GameOfLife extends React.Component {

  static field = {
    columnsAmount: 61,
    rowsAmount: 41,
  };
  static cellState = {
    ALIVE: true,
    DEAD: false,
  };

  // region Initialization

  constructor(props) {
    super(props);

    this.state = {
      cells: this.initializeCells(),
      isGameRunning: false,
    };

    setInterval(() => this.live(), 200)
  }

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

  // endregion

  // region Game update logic

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

    this.setState({ cells: newCells })
  }

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

  // endregion

  // region User Interactions

  toggleCellState(columnIndex, rowIndex) {
    const newCellsState = this.state.cells;

    newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];

    this.setState({ state: newCellsState })
  }

  toggleIsGameRunning() {
    this.setState({ isGameRunning: !this.state.isGameRunning })
  }

  // endregion

  // region Rendering

  renderCells() {
    return (
      <div className="GameOfLife__cells">
        {this.state.cells.map((rows, columnIndex) => {
          return this.renderColumn(rows, columnIndex)
        })}
      </div>
    );
  }

  renderColumn(rows, columnIndex) {
    return (
      <div className="GameOfLife__column" key={`column_${columnIndex}`}>
        {rows.map((cellState, rowIndex) => {
          const cellModifier = cellState === GameOfLife.cellState.DEAD ? 'dead' : 'alive';
          return <div
            className={`GameOfLife__cell GameOfLife__cell--${cellModifier}`}
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
        className="GameOfLife__startGameButton"
        onClick={() => this.toggleIsGameRunning()}
      >
        {buttonLabel}
      </button>
    )
  }

  render() {
    return (
      <div className="GameOfLife">
        {this.renderStartGameButton()}
        {this.renderCells()}
      </div>
    );
  };

  // endregion

}