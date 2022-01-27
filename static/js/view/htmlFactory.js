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
    return `    
    <div class="modal-window">
        <button class="close-modal-window" title="Cancel submit new board">❌</button>
        <div class="new-board-window">
            <form action="/" method="post">
                <div class="new-board-title">Give board name:</div>
                <input type="text" class="new-board-title" id="board-title" name="board-title" placeholder="Board name..." required>
                <div class="new-board-menu-text">Give columns name:</div>
                <div class="new-column-input">
                    <input type="text" class="new-column-name" minlength="1" id="column-name-1" name="column-name-1" value="new">
                    <button type="button" class="remove-input" title="Remove this column">✖</button>
                </div>
                <div class="new-column-input">
                    <input type="text" class="new-column-name" minlength="1" id="column-name-2" name="column-name-2" value="in progress">
                    <button type="button" class="remove-input" title="Remove this column">✖</button>
                </div>
                <div class="new-column-input">
                    <input type="text" class="new-column-name" minlength="1" id="column-name-3" name="column-name-3" value="testing">
                    <button type="button" class="remove-input" title="Remove this column">✖</button>
                </div>
                <div class="new-column-input">
                    <input type="text" class="new-column-name" minlength="1" id="column-name-4" name="column-name-4" value="done">
                    <button type="button" class="remove-input" title="Remove this column">✖</button>
                </div>
                <div class="add-another-new-column-div">
                    <button type="button" class="add-another-new-column" title="Add new column">➕</button> 
                </div>
                 <div class="radio-form">
                     <div class="radio-form-one-pick">
                        <label for="public">Public<span class="public-board-expl" title="This board will be visible to everyone">💡</span></label>
                        <input type="radio" id="public" name="type" value="Public">
                    </div>
                    <div class="radio-form-one-pick">
                        <label for="private">Private<span class="private-board-expl" title="This board will be visible only to you">💡</span></label>
                        <input type="radio" id="private" name="type" value="Private" checked="checked">
                    </div>

                 </div>
                <div class="new-board-submit-buttons">
                    <button type="submit" class="submit-new-board">Save</button>
                </div>
            </form>
        </div>
    </div>
    <div class="overlay"></div>`
}


function newBoardColumn(index){
    return `
<div className="new-column-input">
    <input type="text" className="new-column-name" minLength="1" id="column-name-${index}" name="column-name-${index}"">
    <button type="button" className="remove-input">✖</button>
</div>`
}
