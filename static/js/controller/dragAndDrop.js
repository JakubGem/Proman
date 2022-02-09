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
    // console.log(cardId)
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
    await orderLIst()
}

async function orderLIst(cards) {
    let i = 0
    let a = 0
    let w = 0
    let lista = []
    let divs = document.getElementsByClassName('card')
    let columnsDiv = document.getElementsByClassName('board-column')

    // for(w<columnsDiv; columnsDiv.length; w++){
    //     console.log(columnsDiv[w])
    //     let columnId = columnsDiv.dataset
    //     let column = columnId.columnId
    //     columnsDiv[w].children[w].setAttribute('column-id', column)
    //     // console.log(columnsDiv.dataset.columnId)
    //     // columnsDiv[w].setAttribute('column-id', columnsDiv.dataset['data-column-id'])
    // }
    // {
    let cardsList = []
    for (a; a < divs.length; a++) {
        cardsList.push(divs[a].getAttribute('data-card-id'))
        console.log(cardsList)
        // console.log(divs[a].parentElement.parentElement.getAttribute('data-column-id'))
        // lista.push(cardsList)

    }
    // await dataHandler.cardOrder(cardsList)
    let cardId = document.getElementsByClassName('board-column')
    // console.log(cardId)
    for (i; i < cardId.length; i++) {
        lista.push(cardId[i].getAttribute('data-column-id'))
        // console.log('dupa')

        // console.log(lista)
    }

    await dataHandler.cardOrderList(lista, cardsList)


    // lista.push(cardsList)
    // console.log(cardsList)
    // let list = document.getElementsByClassName('data-column-id')


    // let cardDivs =
    //

}
