export const htmlTemplates = {
    board: 1,
    card: 2,
    newBoard: 4
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.newBoard:
            return newBoardModal
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<div class="board-container">
                <div class="board" data-board-id=${board.id}>${board.title}</div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

export function newBoardModal () {
    return `    <div class="modal-window"></div>
<button class="close-modal-window">❌</button>
        <div class="new-board-window"></div>
<form action="/" method="post">
    <div class="new-board-title">Give board name:</div>
    <input type="text" class="new-board-title" id="board-title" name="board-title" placeholder="Board name..." required>
<div class="new-board-menu-text">Give columns name:</div>
<div class="new-column-input">
    <input type="text" class="new-column-name" minlength="1" id="column-name-1" name="column-name-1" value="new">
    <button type="button" class="remove-input">✖</button>
</div>
<div class="new-column-input">
    <input type="text" class="new-column-name" minlength="1" id="column-name-2" name="column-name-2" value="in progress">
<button type="button" class="remove-input">✖</button>
</div>
<div class="new-column-input">
    <input type="text" class="new-column-name" minlength="1" id="column-name-3" name="column-name-3" value="testing">
<button type="button" class="remove-input">✖</button>
</div>
<div class="new-column-input">
    <input type="text" class="new-column-name" minlength="1" id="column-name-4" name="column-name-4" value="done">
<button type="button" class="remove-input">✖</button>

</div>
    <button type="button" class="add-another-new-column">➕</button>
<!--<div class="new-board-menu-text">Do you want to make this board to be private?</div>-->
 <div class="radio-form">
    <input type="radio" id="private"
     name="type" value="Private" checked="checked">
    <label for="private">Private</label>
    <input type="radio" id="public"
     name="type" value="Public">
    <label for="public">Public</label>
    <div class="new-board-buttons">
<button type="submit">Save</button>
</div>
 </div>
</form>
<div class="overlay"></div>`
}


