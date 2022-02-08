import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates, newBoardModal, newBoardColumn} from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { columnsManager } from "./columnsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        addEventListenerToLogoutbtn()
        if (sessionStorage.getItem('user_id')) addNewBoard()
        const boards = await getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            board.type ? domManager.addChild("#public-boards", content):
            domManager.addChild("#private-boards", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler,
            )
            };
        }
    }


const addEventListenerToLogoutbtn = function (){
    if (sessionStorage.getItem('user_id'))
        document.querySelector('.logout-btn').addEventListener('click', ()=>sessionStorage.removeItem('user_id'))
}


const getBoards = async function (){
    return sessionStorage.getItem('user_id')? await dataHandler.getPrivateBoard(sessionStorage.getItem('user_id')): await dataHandler.getBoards();
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    columnsManager.loadColumns(boardId);
    document.getElementById(`board${boardId}`).classList.add('display');
    clickEvent.currentTarget.removeEventListener('click', showHideButtonHandler);
    clickEvent.currentTarget.addEventListener('click', hideBoard);
    clickEvent.currentTarget.innerHTML='Hide Cards';
}


function hideBoard(e) {
    const boardId = e.target.dataset.boardId;
    document.getElementById(`board${boardId}`).classList.remove('display');
    removeColumns();
    document.querySelector('.add_card_button').remove();
    document.querySelector('.create-new-column').remove();
    e.currentTarget.removeEventListener('click', hideBoard);
    e.currentTarget.addEventListener('click', showHideButtonHandler);
    e.currentTarget.innerHTML='Show Cards';
}

const removeColumns= function () {
    const columns = document.querySelectorAll('.board-columns-container')
    for (let column of columns) column.remove()
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
        data['userid'] = sessionStorage.getItem('user_id')
        data['boardTitle'] = document.getElementById('board-title').value
        data['columns'] = searchingNewColumnsValue()
        data['type'] = document.getElementById('public').checked
        dataHandler.createNewBoard(data)
        alert('You have successfully add new board')
        closeAddNewBoardWindow()
        window.location.reload(true)
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