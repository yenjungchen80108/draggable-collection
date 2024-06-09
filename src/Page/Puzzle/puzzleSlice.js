const initialState = {
  initialBoard: [],
  board: [],
  puzzle: Array.from({ length: 9 }, () => ({})),
  puzzleItemList: [],
};

const findIndexAdapter = (list) => {
  return list.reduce((indices, item, index) => {
    if (item.id !== undefined) {
      indices.push(index);
    }
    return indices;
  }, []);
};

const puzzleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHUFFLE_BOARD":
      const shuffledBoard = [...action.payload].sort(() => Math.random() - 0.5);

      return {
        ...state,
        initialBoard: shuffledBoard,
        board: shuffledBoard,
      };

    case "ADD_IMAGE_TO_BOARD":
      const { id, position } = action.payload;

      const pictureToRemoveIndex = state.board.findIndex(
        (item) => item.id === id
      );

      if (pictureToRemoveIndex !== -1) {
        const isDuplicate = state.puzzleItemList.includes(position);

        if (!isDuplicate) {
          const newBoard = state.board.map((item, index) => {
            return index === pictureToRemoveIndex
              ? { ...state.board[pictureToRemoveIndex], url: "" }
              : item;
          });

          const newPuzzle = state.puzzle.map((item, index) => {
            return index === position
              ? state.board[pictureToRemoveIndex]
              : item;
          });

          return {
            ...state,
            board: newBoard, // delete drag item
            puzzle: newPuzzle, // add drag item
            puzzleItemList: findIndexAdapter(newPuzzle),
          };
        }
      }
      return state;

    case "CLEAR_BOARD":
      return {
        ...state,
        initialBoard: [...state.initialBoard],
        board: [...state.initialBoard],
        puzzle: Array.from({ length: 9 }, () => ({})),
        puzzleItemList: [],
      };
    default:
      return state;
  }
};

export default puzzleReducer;
