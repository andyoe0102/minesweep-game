export const resetGame = () =>({
    type:'RESET_GAME',

});

export const addHeight = ()=>({
    type:'addHeight'
})

export const checkMine = (cell)=>({
    type:'CHECK_MINE',
    payload:cell
})


export const flagCell = (cell)=>({
    type:'FLAG_CELL',
    payload:cell
})
