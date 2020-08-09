import Spreadsheet from './Spreadsheet';



const addButton = (name: string, text: string, fn: EventHandlerNonNull): void => {
  var button = document.createElement("button");
  button.id = name;
  button.className = "button";
  button.innerHTML = text;
  button.addEventListener("click", fn);
  document.getElementById("buttons")?.append(button);
}


const spreadsheet = new Spreadsheet();

spreadsheet.getCells();
spreadsheet.drawCells();


addButton("addcolum","Add column", spreadsheet.addColumn);
addButton("addrow","Add row", spreadsheet.addRow);