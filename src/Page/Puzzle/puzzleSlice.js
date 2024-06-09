const initialState = {
  initialBoard: [],
  board: [],
  puzzle: Array.from({ length: 9 }, () => ({})),
  puzzleItemList: [],
  isPuzzleComplete: null,
};

const findIndexAdapter = (list) => {
  return list.reduce((indices, item, index) => {
    if (item.id !== undefined) {
      indices.push(index);
    }
    return indices;
  }, []);
};

const checkPuzzleComplete = (puzzle) => {
  for (let i = 0; i < puzzle.length; i++) {
    if (puzzle[i].id !== i + 1) {
      return false;
    }
  }
  return true;
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
      const pictureIdToAdd = action.payload;
      const targetPosition = action.position;

      const pictureToRemoveIndex = state.board.findIndex(
        (item) => item.id === pictureIdToAdd
      );

      if (pictureToRemoveIndex !== -1) {
        const isDuplicate = state.puzzleItemList.includes(targetPosition);

        if (!isDuplicate) {
          const newBoard = state.board.map((item, index) => {
            return index === pictureToRemoveIndex
              ? { ...state.board[pictureToRemoveIndex], url: "" }
              : item;
          });

          const newPuzzle = state.puzzle.map((item, index) => {
            return index === targetPosition
              ? state.board[pictureToRemoveIndex]
              : item;
          });

          const isComplete =
            state.puzzleItemList.length === 8
              ? checkPuzzleComplete(newPuzzle)
              : null;

          return {
            ...state,
            board: newBoard, // delete drag item
            puzzle: newPuzzle, // add drag item
            puzzleItemList: findIndexAdapter(newPuzzle),
            isPuzzleComplete: isComplete,
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
        isPuzzleComplete: null,
      };
    default:
      return state;
  }
};

export default puzzleReducer;
