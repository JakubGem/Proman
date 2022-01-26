import { dataHandler } from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, loadAddNewCardButton} from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { columnsManager } from "./columnsManager.js";

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    console.debug(boards);
    for (let board of boards) {
      const boardBuilder = htmlFactory(htmlTemplates.board);
      const content = boardBuilder(board);
      domManager.addChild("#root", content);
      domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler,
      );
    }
  },
};

function showHideButtonHandler(clickEvent) {
  const boardId = clickEvent.target.dataset.boardId;
  columnsManager.loadColumns(boardId);
  document.getElementById(`board${boardId}`).classList.add('display')

}
