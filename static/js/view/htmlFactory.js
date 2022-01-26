export const htmlTemplates = {
    board: 1,
    card: 2,
    column:3
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.column:
            return columnBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<div class="board-container" id='board${board.id}'>
            <div class="board-header">${board.title}</div>
            <div class="board" data-board-id=${board.id}></div>    
            </div>
            <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

function columnBuilder(column) {
    return `<div class="board-columns-container">
<div class="board-column" data-column-id="${column.id}">${column.title}</div>
</div>`;
}