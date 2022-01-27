import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates, loadAddNewCardButton} from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager, create_card} from "./cardsManager.js";

export let columnsManager = {
  loadColumns: async function (boardId) {
    const columns = await dataHandler.getColumnsByBoardId(boardId)
    for (let column of columns) {
      const columnBuilder = htmlFactory(htmlTemplates.column);
      const content = columnBuilder(column);
      domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
      domManager.addEventListener(
        `.board-column[data-column-id="${column.id}"]`,
        "click",
        deleteButtonHandler)
    }
    await cardsManager.loadCards(boardId, columns);
    console.log(boardId);
    domManager.addChild(`.board[data-board-id="${boardId}"]`, loadAddNewCardButton(boardId));
    document.getElementById('add_card_button_for_board' + boardId).addEventListener('click', () => createNewCard(boardId, columns));
  },
};

function deleteButtonHandler(clickEvent) {

}

async function createNewCard(boardId, columns){
  let new_title = prompt('Enter card title: ', 'card title');
  if (new_title !== null) {
    let response = await fetch("/api/boards/" + boardId.toString() + "/cards/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: new_title}) // ZAMIENIA SŁOWIK NA JSONA
    }); // robi posta na podanego urla
    let card = await response.json();
    console.log(card);
    create_card(card);
  }
}
