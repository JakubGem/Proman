import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates, newBoardModal, newBoardColumn, loadAddNewCardButton} from "../view/htmlFactory.js";
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

export const addNewBoard = function (){
  document.querySelector('.new-board-button').addEventListener('click', newBoardMenu)
}

async function newBoardMenu (){
  const content = newBoardModal();
  domManager.addChild("#root", content, 'afterend');
  document.querySelector('.new-board-btn-container').classList.add('hidden')
  addEventListenerToCloseModalWinow()
  addEventListenerToRemoveButtons()
  addEventListenerToAddNewColumnButton()
  await submitNewBoard()
}

const addEventListenerToCloseModalWinow = function (){
  document.querySelector('.close-modal-window').addEventListener('click', closeAddNewBoardWindow)
}


const addEventListenerToRemoveButtons = function (){
  const buttons = document.querySelectorAll('.remove-input')
  for (let button of buttons) {
    button.addEventListener('click', ()=>button.parentElement.remove())
  }
}

const addEventListenerToAddNewColumnButton = function () {
  const addNewColumnBtn = document.querySelector('.add-another-new-column');
  addNewColumnBtn.addEventListener('click', addNewColumnToNewBoard)
}

const addNewColumnToNewBoard = function (){
  const newColumnsContainerClass = '.all-new-columns'
  const content = newBoardColumn()
  domManager.addChild(newColumnsContainerClass, content)
  }


const submitNewBoard = async function () {
  const newBoard = document.getElementById('new-board-form');
  newBoard.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = {}
    data['userid'] = 1
    data['boardTitle'] = document.getElementById('board-title').value
    data['columns'] = searchingNewColumnsValue()
    data['type'] = document.getElementById('public').checked
    console.debug(data)
    dataHandler.createNewBoard(data)
    alert('You have successfully add new board')
    closeAddNewBoardWindow()
  })
}

const searchingNewColumnsValue = function (){
  const allNewBoardColumnData = document.querySelectorAll('.new-column-name');
  const columnData= {}
  for (let i=0; i<allNewBoardColumnData.length; i++){
      columnData[i+1] = allNewBoardColumnData[i].value
    }
  return columnData
}


const closeAddNewBoardWindow = function (){
    document.getElementById('add-new-board-window').remove()
    document.querySelector('.new-board-btn-container').classList.remove('hidden')
    document.querySelector('.overlay').classList.add('hidden')
  }