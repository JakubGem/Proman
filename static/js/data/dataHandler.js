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
  cardOrderList: async function (lista, cardList) {
    const lists = {
        'list': lista,
        'cardList': cardList
    };
    const response = await apiPostt(`/api/get-order-list`, lists, cardList);
    return response;
  },


  // cardOrder: async function (cardsList) {
  //   const cardList = {
  //       'cardList': cardsList
  //   };
  //   const response = await apiPost(`/api/get-order-list`, cardList);
  //   return response;
  // },

  createNewCard: async function (cardTitle, boardId, statusId) {
    // creates new card, saves it and calls the callback function with its data
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

// async function apiPut(url, data) {
//     let response = await fetch(url, {
//         method: "PUT",
//         headers: {
//       'Content-Type': 'application/json'},
//         body: JSON.stringify(data),
//     });
//   if (response.status === 200) {
//     await response.json();
//   }
// }
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



// async function apiPost(url, cardList) {
//     let response = await fetch(url, {
//         method: "POST",
//         headers: {
//       'Content-Type': 'application/json'},
//         body: JSON.stringify(cardList),
//     });
//     if (response.status === 200) {
//         await response.json();
//         console.log("POST sent successfully")
//     }
// }

async function apiPostt(url, lists) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
      'Content-Type': 'application/json'},
        body: JSON.stringify(lists),
    });
    if (response.status === 200) {
        await response.json();
        console.log("POST sent successfully")
    }
}

async function apiDelete(url) {}

// async function apiPut(url) {}
