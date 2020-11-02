import React from 'react';
import {connect} from 'react-redux';
import Cell from './Cell';

import './Grid.css';

const Grid= ({minesweeper})=>{
    if(minesweeper.lose){
        alert('you lose!')
    }

    if(minesweeper.win){
        alert('you win!')
    }
    return(
        <div className="grid">
            {
                minesweeper.grid.map((row,rowidx)=>{
                    return (
                    <div className="row">
                        {row.map((col,colidx)=>{
                        return <Cell key ={`${rowidx}-${colidx}`} cell={col}/>
                    })}
                    </div>
                    )
                })
            }
        </div>


    )
};

const mapStateToProps = state => ({
    minesweeper: state.minesweeper
  })

export default connect(mapStateToProps,null)(Grid);