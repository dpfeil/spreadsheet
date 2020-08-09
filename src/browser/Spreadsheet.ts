import Cell from './Cell';


const defaults = {
  width: 5,
  height: 5,
  cellWidth: "60px",
  cellHeight: "30px",
}


const removeAllChildNodes = (parent: HTMLElement): void => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const createGrid = (count: number, value: string) : string => {
  let array = [];
  for(let x = 0; x < count; x++) {
    array.push(value);
  }
  return array.join(" ");
}



const sortCells = (a: string, b: string) : number => {
  const anum = a.match(/[0-9]+/gi);
  const aRow = (anum !== null ? anum[0] : -1)
  const bnum = b.match(/[0-9]+/gi);
  const bRow = (bnum !== null ? bnum[0] : -1)
  const alet = a.match(/[a-z]+/gi);
  const aCol = (alet !== null ? alet[0] : -1)
  const blet = b.match(/[a-z]+/gi);
  const bCol = (blet !== null ? blet[0] : -1)
  if(aRow < bRow)
    return -1;
  if(aRow > bRow)
    return 1;
  if(aCol < bCol)
    return -1;
  if(aCol > bCol)
    return 1;
  return 0;
};


interface Values<T> {
  [key: string]: T;
}

class Spreadsheet {
  width: number;
  height: number;
  cells: Values<Cell> = {};
  constructor(width: number = defaults.width, height: number = defaults.height) {
    this.width = width;
    this.height = height
  }

  getLetter = (num : number): string => {
    const base = Math.floor(num / 26);
    const rem = num % 26;
    return (base > 0 ? String.fromCharCode(96 + base) : "") + String.fromCharCode(97 + rem);
  }

  getCellValue = (key: string): string => {
    return this.cells[key.toLowerCase()].evaluate();
  }


  getCells = (): void => {
    const cells = Object.assign({},this.cells);
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        const id = `${this.getLetter(j)}${i}`;
        if(!(id in this.cells)) {
          const value = "";
          const cell = new Cell(id,value,this.getCellValue);
          cells[id] = cell;
        }
      }
    }
    this.cells = cells;
  }

  onCellBlur = (): void => {
    this.drawCells();
  }

  drawCells = (): void => {
    const ss = document.getElementById('spreadsheet');
    if(ss === null)
      return;
    removeAllChildNodes(ss);
    const sortedKeys = Object.keys(this.cells).sort(sortCells);
    for(let k = 0; k < sortedKeys.length; k++) {
      const cellElement = this.cells[sortedKeys[k]].getHTMLElement();
      cellElement.firstChild?.addEventListener("blur",this.onCellBlur);
      ss.appendChild(cellElement);
    }
  }


  addColumn = (): void => {
    this.width = this.width + 1;
    document.getElementById('spreadsheet')?.style.setProperty('grid-template-columns', createGrid(this.width, defaults.cellWidth));
    this.getCells();
    this.drawCells();
  }
  
  addRow = (): void => {
    this.height = this.height + 1;
    document.getElementById('spreadsheet')?.style.setProperty('grid-template-rows', createGrid(this.height, defaults.cellHeight));
    this.getCells();
    this.drawCells();
  }

}

export default Spreadsheet;