export let dataHandler = {
  getBoards: async function () {
    const response = await apiGet("/api/boards");
    return response;
  },

  getColumnsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/columns/${boardId}`);
    return response;  },

  getCardsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}/cards/`);
    return response;
  },

  createNewBoard: async function (data) {
    const response = await apiPost(`/save_new_board`, data);
    return response;
  },

changeColumn: async function (cardId, columnId) {
    const data = {
      'card_id': cardId,
      'column_id': columnId
    };
  const response = await apiPut(`/api/cards/${cardId}/change-column`, data);
  return response;
}
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

async function apiPut(url, data) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {
      'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    if (response.status === 200) {
        await response.json();
        console.log("PUT sent successfully")
    }
}

async function apiPost(url, payload) {
  let dataToSend = {
    method: "POST",
    headers: {
      'Content-Type':  "application/json"
    },
    body : JSON.stringify(payload)
  }
  let response = await fetch(url, dataToSend);
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}
