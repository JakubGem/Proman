import { boardsManager } from "./controller/boardsManager.js";
import { addNewBoard } from "./controller/boardsManager.js";
function init() {
  addNewBoard()
  boardsManager.loadBoards();

}


init();
