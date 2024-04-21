import { combineReducers } from "redux";

import puzzleReducer from "./Page/Puzzle/puzzleSlice";

const rootReducer = combineReducers({
  puzzle: puzzleReducer,
});

export default rootReducer;
