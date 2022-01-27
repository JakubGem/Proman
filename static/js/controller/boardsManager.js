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
  addEventListenerToRemoveButtons()
  addEventListenerToAddNewColumnButton()
  submitNewBoard()
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
  const newColumnsContainer = document.querySelector('.all-new-columns');
  const hasChild = newColumnsContainer.children.length > 0;
  const newColumnsContainerClass = '.all-new-columns'
  if (!hasChild){
    const content = newBoardColumn(1)
    domManager.addChild(newColumnsContainerClass, content)
  } else {
    findLowestColumnIndex()
  }
}

const findLowestColumnIndex = function (){
  const newColumnsDiv = document.querySelectorAll('.new-column-input')
  const columnsId = []
  for (let column of newColumnsDiv){
    console.debug(column)
  }
}

const submitNewBoard = async function () {
  const newBoard = document.getElementById('new-board-form');
  newBoard.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = {}
    data['userid'] = 1
    data['boardTitle'] = document.getElementById('board-title').value
    data['col1'] = document.getElementById('column-name-1').value
    data['col2'] = document.getElementById('column-name-2').value
    data['col3'] = document.getElementById('column-name-3').value
    data['col4'] = document.getElementById('column-name-4').value
    dataHandler.createNewBoard(data)
    alert('You have successfully add new board')
    // alert('You have successfully add new board')
  })
}

const searchingNewColumnsValue = function (){

}