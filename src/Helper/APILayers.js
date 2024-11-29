import { ApiMockResponse } from "../ApiMockData/dummyData";

const LocalStorageKeyName = "TaskDeck";

// Data Layer
export class BoardAPI {
  async fetchBoardList() {
    //for dummy data we can use ApiMockResponse
    // const apiData = ApiMockResponse;
    const apiData = [];
    let BoardList = [];
    
    if (localStorage.getItem(LocalStorageKeyName)) {
      const localStorageData = JSON.parse(
        localStorage.getItem(LocalStorageKeyName) || ""
      );
      BoardList = [...localStorageData];
    } else {
      BoardList = [...apiData];
      updateLocalStorageBoards(BoardList);
    }

    return BoardList;
  }
}

// Business Layer
export async function fetchBoardList() {
  const api = new BoardAPI();
  return api.fetchBoardList();
}

export function updateLocalStorageBoards(boards) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(boards));
}
