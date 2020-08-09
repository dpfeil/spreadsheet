import Spreadsheet from './Spreadsheet';



const addButton = (name: string, text: string, fn: EventHandlerNonNull): void => {
  var button = document.createElement("button");
  button.id = name;
  button.innerHTML = text;
  button.addEventListener("click", fn);
  document.getElementById("buttons")?.append(button);
}


const spreadsheet = new Spreadsheet();

spreadsheet.getCells();
spreadsheet.drawCells();


addButton("addcolum","add column", spreadsheet.addColumn);
addButton("addrow","add row", spreadsheet.addRow);