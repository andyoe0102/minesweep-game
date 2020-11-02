import {placemines,addneighbors,checkWin,checkMines,removeDuplicates,revealCells,flagCell} from './minesweeper.utils'

const INITIAL_STATE ={
    width : 10,
    height : 10,
    mineCount : 10,
    started:false,
    win:false,
    lose:false,
    grid: Array(10).fill(0).map((idx,key)=>{
        return Array(10).fill(0).map((idx2,key2)=>{
            return {
                id: `${key2}-${key}`,
                x: key2,
                y:key,
                flagged:false,
                mine:false,
                revealed:false,
                neighborCount:''
            }
        })
    })
}

const minesweepReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case 'RESET_GAME':
            return INITIAL_STATE;

        case 'CHECK_MINE':
            if(state.win || state.lose){
                return state
            }

            if(!state.started){
                console.log('first search!')
                state = placemines(state,action.payload.id);
                let newstate = addneighbors(state);

                let {x,y} = action.payload
                let cell = newstate.grid[y][x]

                let checkedMines = checkMines(newstate,cell);
                let uniqueArray = removeDuplicates(checkedMines, "id");
    
                let revealedState = revealCells(newstate,uniqueArray)



                return {
                    ...revealedState
                }
            }else{
                console.log('not first search!')

                if(action.payload.revealed){
                    console.log('already relvealed!')
                    return state;
                }
                let checkedMines = checkMines(state,action.payload);
                let uniqueArray = removeDuplicates(checkedMines, "id");
  
                let revealedState = revealCells(state,uniqueArray)
                let lose = action.payload.mine;
                let win = checkWin(revealedState);

                return {
                    ...revealedState,
                    win,
                    lose
                }

            }
        case 'FLAG_CELL':

            if(!state.started){


                state = placemines(state,action.payload.id);
                let newstate = addneighbors(state);

                let {x,y} = action.payload
                let cell = newstate.grid[y][x]

                newstate = flagCell(newstate,cell)

                return newstate;
            }


            let newstate = flagCell(state,action.payload)


            return newstate



            
            

        default:
            return state;
    }
}

export default minesweepReducer;

