import * as actions from './minesweeper.actions'

describe('actions', ()=>{
    it('should create an action to reset a gmae', () =>{
        const expectedAction ={
            type:'RESET_GAME'
        }

        expect(actions.resetGame()).toEqual(expectedAction)
    });

    it('should create an action to check cell for mine',()=>{
        let cell ={
            flagged: false,
            id: "3-2",
            mine: false,
            neighborCount: 1,
            revealed: false,
            x: 3,
            y: 2
        }

        const expectedAction = {
            type:'CHECK_MINE',
            payload:cell
        }

        expect(actions.checkMine(cell)).toEqual(expectedAction)
    })

    it('should create an action to flag a cell',()=>{
        let cell ={
            flagged: false,
            id: "3-2",
            mine: false,
            neighborCount: 1,
            revealed: false,
            x: 3,
            y: 2
        }

        const expectedAction = {
            type:'FLAG_CELL',
            payload:cell
        }
    })
})