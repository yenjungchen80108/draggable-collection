export const initializeBoard = () => ({
  type: "INITIALIZE_BOARD",
});

export const shuffleBoard = (board) => ({
  type: "SHUFFLE_BOARD",
  payload: board,
});

export const addImageToBoard = (id, position) => ({
  type: "ADD_IMAGE_TO_BOARD",
  payload: id,
  position: position,
});

export const clearBoard = () => ({
  type: "CLEAR_BOARD",
});
