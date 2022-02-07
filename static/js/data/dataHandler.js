export let dataHandler = {
  getBoards: async function () {
    const response = await apiGet("/api/boards");
    return response;
  },
  getBoard: async function (boardId) {
    // the board is retrieved and then the callback function is called with the board
  },
  getColumnsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/columns/${boardId}`);
    return response;  },
  getStatus: async function (statusId) {
    // the status is retrieved and then the callback function is called with the status
  },
  getCardsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}/cards/`);
    return response;
  },
  getCard: async function (cardId) {
    // the card is retrieved and then the callback function is called with the card
  },
  createNewBoard: async function (boardTitle) {
    // creates new board, saves it and calls the callback function with its data
  },
  createNewColumn: async function (columnTitle, boardId) {
    let payload = {'title': columnTitle};
    const response = await apiPost(`/api/columns/${boardId}/add`, payload);
    return response;
  },
  deleteColumn: async function (columnId) {
    const response = await apiDelete(`/api/columns/${columnId}/delete`);
    return response;
  },
  createNewCard: async function (cardTitle, boardId, statusId) {
    // creates new card, saves it and calls the callback function with its data
  },
};

async function apiGet(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  });
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}

async function apiDelete(url) {
  let response = await fetch(url, {
    method: "DELETE",
  });
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}

async function apiPut(url) {}
