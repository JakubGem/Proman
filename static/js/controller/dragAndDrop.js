import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";

const div = {card1: null}
export async function drop(){
const cards = document.querySelectorAll('.card');
const empties = document.querySelectorAll('.empty');

cards.forEach((card) => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd)
});

empties.forEach((empty) => {

    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop)
});

}

let dragable = null;

function dragStart(e) {
    drop()
    div.card1 = e.currentTarget

    dragable = this;
    console.log('start')
    // return div
}

function dragEnd() {
    dragable = null;
    console.log('end')
}

function dragOver(e) {
    e.preventDefault();
    console.log('dragover')
}

function dragEnter() {
    console.log('enter')
}

function dragLeave() {
    console.log('leave')
}

async function dragDrop(e, boardId) {
    let cardId = e.currentTarget
    console.log(cardId.parentElement.parentElement.parentElement.getAttribute('data-board-id'))
    console.log(cardId.parentElement)
    let getBoard = document.getElementsByClassName('board')
    // console.log(getBoard)
    console.log(getBoard)
    // const cards = await dataHandler.getCardsByBoardId(boardId);
    // console.log(cards)





    // let container = document.getElementsByTagName('board-column')
    // console.log(container)
    cardId.insertAdjacentElement("afterbegin", div.card1)
    let addDiv = document.createElement('div')
    addDiv.className = 'empty'
    cardId.insertAdjacentElement('afterend', addDiv)
    console.log('drop')
}

