import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";



export let cardsManager = {
  loadCards: async function (boardId, columns) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    console.debug(cards)
    const cardsList = []
    for (const column of columns) {
      let temporaryList = cards.filter(card => card.columns_id === column.id);
      cardsList.push(temporaryList.sort(SortCards));
    }
    for (let cards of cardsList) {
      for (let card of cards) {
        const cardBuilder = htmlFactory(htmlTemplates.card);
        const content = cardBuilder(card);
        domManager.addChild(`.board-column[data-column-id="${card.columns_id}"]`, content);
        domManager.addEventListener(
          `.card[data-card-id="${card.id}"]`,
          "click",
          deleteButtonHandler
      );
      }

    }
  },
};

function SortCards(card1, card2) {
  return card1.card_order > card2.card_order ? 1 : -1;
}

function deleteButtonHandler(clickEvent) {

}
