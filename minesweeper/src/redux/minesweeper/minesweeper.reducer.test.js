import reducer from './minesweeper.reducer';
import 'core-js';

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


describe('minesweeper reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      INITIAL_STATE
    )
  })

  it('should handle CHECK_MINE', () => {

    let cell ={
        flagged: false,
        id: "3-2",
        mine: false,
        neighborCount: 1,
        revealed: false,
        x: 3,
        y: 2
    }
    expect(
      reducer(INITIAL_STATE, {
        type: 'CHECK_MINE',
        payload : cell
      })).not.toEqual(INITIAL_STATE)
    
    });

    it('should handle FLAG_MINE',()=>{
        let cell ={
            flagged: false,
            id: "3-2",
            mine: false,
            neighborCount: 0,
            revealed: false,
            x: 3,
            y: 2
        }

        expect(
          reducer(INITIAL_STATE, {
            type: 'FLAG_MINE',
            payload : cell
          }).grid[2][3].flagged).toEqual(false)
    })
})