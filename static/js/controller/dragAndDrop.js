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

function dragStart(e) {
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
    let columnId = cardId.parentElement.getAttribute('data-column-id')
    cardId.insertAdjacentElement("afterbegin", div.card1)
    let addDiv = document.createElement('div')
    addDiv.className = 'empty'
    cardId.insertAdjacentElement('afterend', addDiv)
    console.log('drop')
    await dataHandler.changeColumn(cardId1, columnId)
    await orderLIst()
}

async function orderLIst() {
    let i = 0
    let a = 0
    let lista = []
    let divs = document.getElementsByClassName('card')

    let cardsList = []
    for (a; a < divs.length; a++) {
        cardsList.push(divs[a].getAttribute('data-card-id'))
        console.log(cardsList)

    }
    let cardId = document.getElementsByClassName('board-column')
    for (i; i < cardId.length; i++) {
        lista.push(cardId[i].getAttribute('data-column-id'))
    }

    await dataHandler.cardOrderList(cardsList)


}
