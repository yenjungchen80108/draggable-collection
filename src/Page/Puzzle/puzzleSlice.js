const initialState = {
  initialBoard: [],
  board: [],
  puzzle: Array.from({ length: 9 }, () => ({})),
};

const puzzleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHUFFLE_BOARD":
      const shuffledBoard = action.payload
        .slice()
        .sort(() => Math.random() - 0.5);

      return {
        ...state,
        initialBoard: shuffledBoard,
        board: shuffledBoard,
      };

    case "ADD_IMAGE_TO_BOARD":
      const pictureIdToAdd = action.payload;
      const pictureToRemoveIndex = state.board.findIndex(
        (item) => item.id === pictureIdToAdd
      );

      if (pictureToRemoveIndex !== -1) {
        const isDuplicate = state.puzzle.some(
          (item) => item.id === pictureIdToAdd
        );

        if (!isDuplicate) {
          const newBoard = state.board.map((item, index) => {
            return index === pictureToRemoveIndex
              ? { ...state.board[pictureToRemoveIndex], url: "" }
              : item;
          });

          const newPuzzle = state.puzzle.map((item, index) => {
            return index === action.position
              ? state.board[pictureToRemoveIndex]
              : item;
          });

          return {
            ...state,
            board: newBoard, // delete drag item
            puzzle: newPuzzle, // add drag item
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
      };
    default:
      return state;
  }
};

export default puzzleReducer;
