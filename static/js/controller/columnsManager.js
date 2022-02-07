import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";

export let columnsManager = {
  loadColumns: async function (boardId) {
    const buttonBuilder = htmlFactory(htmlTemplates.button);
    const content = buttonBuilder(boardId);
      domManager.addChild(`.board-container[id='board${boardId}']`, content);
      domManager.addEventListener(`.create-new-column[data-button-id="${boardId}"]`, "click",
          addNewColumn);
    const columns = await dataHandler.getColumnsByBoardId(boardId)
    for (let column of columns) {
      const columnBuilder = htmlFactory(htmlTemplates.column);
      const content = columnBuilder(column);
      domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
      domManager.addEventListener(
        `.delete-column[data-column-id="${column.id}"]`,
        "click",
        deleteButtonHandler)
    }await cardsManager.loadCards(boardId, columns)
  },
};

async function addNewColumn (clickEvent) {
  const boardId = clickEvent.target.dataset.buttonId;
  let columnTitle = prompt("Please Provide New Column Title");
  await dataHandler.createNewColumn(columnTitle, boardId);
  await columnsManager.loadColumns(boardId);

}

async function deleteButtonHandler(clickEvent) {
  const columnId = clickEvent.target.dataset.columnId;
  const boardId = clickEvent.target.dataset.boardId;
  if (confirm('Are you sure you want to delete this column?')) {
    await dataHandler.deleteColumn(columnId);
    await columnsManager.loadColumns(boardId);
  } else {
    await columnsManager.loadColumns(boardId);
  }
}
