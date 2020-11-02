import {combineReducers} from 'redux';
import minesweepReducer from './minesweeper/minesweeper.reducer';

import minesweeperReducer from './minesweeper/minesweeper.reducer'

export default combineReducers({
    minesweeper: minesweepReducer
});