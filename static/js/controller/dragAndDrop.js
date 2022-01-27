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
let cardId1 = 0
// console.log(cardId1)

function dragStart(e) {
    orderLIst()
    drop()
    div.card1 = e.currentTarget
    // console.log(div.card1)
    let cardIdi = div.card1.getAttribute('data-card-id')
    cardId1 = cardIdi
    // console.log(cardIdi)
    dragable = this;
    console.log('start')
    // return cardId1
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

async function dragDrop(e) {

    let cardId = e.currentTarget
    let boardId = cardId.parentElement.parentElement.parentElement.getAttribute('data-board-id')
    let columnId = cardId.parentElement.getAttribute('data-column-id')
    // console.log(cardIdi)
    // console.log(columnId)
    // console.log(cardId.parentElement.parentElement.parentElement.parentElement)
    // console.log(columnId)
    // console.log(cardId.parentElement.parentElement.parentElement)
    // let getBoard = document.getElementsByClassName('board')
    // console.log(getBoard)
    // console.log(getBoard)
    // const cards = await dataHandler.getCardsByBoardId(boardId);
    // console.log(cards)
    // let container = document.getElementsByTagName('board-column')
    // console.log(container)
    cardId.insertAdjacentElement("afterbegin", div.card1)
    let addDiv = document.createElement('div')
    addDiv.className = 'empty'
    cardId.insertAdjacentElement('afterend', addDiv)
    console.log('drop')
    await dataHandler.changeColumn(cardId1, columnId)
}

function orderLIst(cards){
    let i = 0
    let a = 0
    // let divs = document.getElementsByClassName('empty')
    // for(a; a < divs.length; a++){
    //     console.log(divs[a])
    // }

    let list = document.getElementsByClassName('card')
    for(i; i < list.length; i++){
        let orderedList = list[i].getAttribute('data-card-id')
        console.log(orderedList[i])


    }






}