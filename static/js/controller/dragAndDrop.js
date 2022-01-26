function drop(){
const cards = document.querySelectorAll('.card');
const empties = document.querySelectorAll('.empty');
console.log(cards);

cards.forEach((card) => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd)
});

empties.forEach((empty) => {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('dragdrop', dragDrop)
});

}

let dragable = null;
function dragStart() {
    dragable = this;
    console.log('start')
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

function dragDrop() {
    this.appendChild(dragable)
    console.log('drop')
}
