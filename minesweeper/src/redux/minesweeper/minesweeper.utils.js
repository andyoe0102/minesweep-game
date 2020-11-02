function sampleSize(array, n) {
    n = n == null ? 1 : n
    let length = array == null ? 0 : array.length
    if (!length || n < 1) {
      return []
    }
    n = n > length ? length : n
    let index = -1
    let lastIndex = length - 1
    let result = [...array];
    while (++index < n) {
      let rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      let value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    return result.slice(0,n)
  }

function defineCells(state,mines){
    return{
        ...state,
        grid: state.grid.map((row)=>{
            return row.map((col)=>{
                return mines.includes(col.id)? {...col,mine:true} : col
            })
        })
    }
}

function checkNeighbor(state,x,y){
    if(x < 0 || y < 0 || x>9 || y>9){
        return 0
    };

    if(state.grid[y][x].mine===true){
        return 1
    }else{
        return 0
    }
}

function countNeighbors(state,cell){
    const {x,y} = cell;
    if(cell.mine===true){
        return ''
    }

    let topleft = checkNeighbor(state,x-1,y-1);
    let top = checkNeighbor(state,x,y-1);
    let topright = checkNeighbor(state,x+1,y-1);
    let left = checkNeighbor(state,x-1,y);
    let right = checkNeighbor(state,x+1,y);
    let bottomleft = checkNeighbor(state,x-1,y+1);
    let bottom= checkNeighbor(state,x,y+1);
    let bottomright=checkNeighbor(state,x+1,y+1);
    
    let total = topleft + top + topright+left+right+bottomleft+bottom+bottomright

    return total;
}

const findNeighbors = (state,cell) =>{
    const {x,y} = cell;

    function checkExist(state,x,y){
        if(x<0 || y <0 | x>9 || y> 9){
            return undefined
        }

        if(state.grid[y][x] ===undefined){
            return undefined
        }else{
            return state.grid[y][x]
        }
    }

    let array = [
        checkExist(state,x-1,y-1),
        checkExist(state,x,y-1),
        checkExist(state,x+1,y-1),
        checkExist(state,x-1,y),
        checkExist(state,x+1,y),
        checkExist(state,x-1,y+1),
        checkExist(state,x,y+1),
        checkExist(state,x+1,y+1)
    ]

    return array.filter((idx)=>{
        return idx !==undefined
    })
}

export const placemines = (state,cellId) => {
    let cells = state.grid.flat().filter((cell)=>cell.id !== cellId).map((cell)=>cell.id);

    let mines = sampleSize(cells,state.mineCount);

    let newCells = defineCells(state,mines);

    return{
        ...defineCells(state,mines),
        started:true
    }
}
    


export const addneighbors= (state)=>{
    let total = 0;
    return {    
        ...state,
        grid: state.grid.map((row)=>{
            return row.map((col)=>{
                let neighborCount = countNeighbors(state,col);
                return {...col,neighborCount:neighborCount}
        })
    })
    }
    
}

export const checkWin = (state) =>{
    let totalRevealed = 0;
    state.grid.map((row)=>{
        return row.map((col)=>{
            if(col.revealed){
                totalRevealed+=1
            }
        })
    })

    if(totalRevealed === 90){
        return true
    }else{
        return false
    }
}


export const checkMines = (state,cell,checked=[])=>{
    let NeighborCells = findNeighbors(state,cell);

    if(cell.mine){
        return [cell]
    }

    checked.push(cell)
    if(cell.neighborCount >0){
        return [cell]
    }else{
        let ids = checked.map((obj)=>{return obj.id})
        let checkMinesArray = NeighborCells.filter((neighborcell)=>{

            return neighborcell.flagged === false && ids.includes(neighborcell.id) === false;
        })


        return [cell,
            ...checkMinesArray.map((neighborcell)=> checkMines(state,neighborcell,checked))
        ].flat()
    }


}

export const removeDuplicates=(originalArray, prop)=> {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

export const revealCells =(state,array)=>{
    let ids = array.map((cell)=>{
        return cell.id
    });

    return {
        ...state,
        grid:state.grid.map((row)=>{
            return row.map((col)=>{
                return ids.includes(col.id)? ({...col, revealed:true}):col
            })
        })
    }
}   

export const flagCell = (state,cell)=>{

    if(cell.revealed){
        return state
    }else{
        let newstate ={
            ...state,
            grid: state.grid.map((row)=>{
                return row.map((col)=>{
                    return cell.id === col.id?({...col, flagged: !col.flagged}): col
                })
            })
        }

        return newstate
    }
    return state
}

