// reducers.js
const initialState = {
  initialBoard: [],
  board: [],
  puzzle: Array.from({ length: 9 }, () => ({})),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHUFFLE_BOARD":
      return {
        ...state,
        initialBoard: action.payload,
        board: action.payload,
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
          const newPuzzle = state.puzzle.map((item, index) => {
            // 如果索引等於要替換的位置，則返回新的圖片物件，否則返回原圖片物件
            return index === action.position
              ? state.board[pictureToRemoveIndex]
              : item;
          });

          return {
            ...state,
            puzzle: newPuzzle, // add drag item
            board: state.board.map((item, index) =>
              index === pictureToRemoveIndex
                ? { ...state.board[pictureToRemoveIndex], url: "" }
                : item
            ), // delete drag item
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

export default reducer;
