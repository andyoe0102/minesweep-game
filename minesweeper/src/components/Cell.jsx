import React from 'react';
import {connect} from 'react-redux';
import { checkMine,flagCell } from '../redux/minesweeper/minesweeper.actions';
import './Cell.css';


import blank from '../assets/board_blank_unclicked.png';
import check from '../assets/board_blank_clicked.png';
import flag from '../assets/board_flag.png';
import greymine from '../assets/board_mine_gray.png';
import redmine from '../assets/board_mine_red.png';
import one from '../assets/board_01.png';
import two from '../assets/board_02.png';
import three from '../assets/board_03.png';
import four from '../assets/board_04.png';


                


const textStyles ={
    position:'relative',
    display:'block',
    fontSize:'10px',
    margin:'0px',
    padding:'0px'
}



class Cell extends React.Component{
    constructor(props){
        super(props)

        this.leftClick = this.leftClick.bind(this);
        this.rightClick = this.rightClick.bind(this);
    }

    leftClick(event){
        event.preventDefault();
        this.props.checkMine(this.props.cell)
    }

    rightClick(event){
        event.preventDefault();

        if(event.nativeEvent.which === 3){

            this.props.flagCell(this.props.cell)
        }
    }

    render(){
        const {cell,checkMine,flagCell,minesweeper} = this.props;

        let picture;

        if(minesweeper.lose || minesweeper.win){
            if(cell.revealed && cell.mine){
                picture = redmine
            }else if(!cell.revealed && cell.mine){
                picture = greymine
            }else{
                if(cell.neighborCount === 0){
                    picture = check;
                }else if(cell.neighborCount === 1){
                    picture = one;
                }else if(cell.neighborCount === 2){
                    picture = two;
                }else if(cell.neighborCount === 3){
                    picture = three;
                }else if(cell.neighborCount ===4){
                    picture = four;
                }
            }
        }else{
            if(!cell.revealed){
                if(cell.flagged){
                    picture = flag
                }else{
                    picture = blank
                }
            }else{
                if(cell.neighborCount === 0){
                    picture = check;
                }else if(cell.neighborCount === 1){
                    picture = one;
                }else if(cell.neighborCount === 2){
                    picture = two;
                }else if(cell.neighborCount === 3){
                    picture = three;
                }else if(cell.neighborCount ===4){
                    picture = four;
                }
            }
        }
        
        return(

            <div className="cell">
                <img className="minesweeperimg" alt='pic' src={picture} 
                        onMouseDown={this.rightClick}
                        onClick={this.leftClick} 
                        onContextMenu={(e)=> (e.preventDefault(),false)
                        }
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    checkMine: (cell) => dispatch(checkMine(cell)),
    flagCell: (cell) => dispatch(flagCell(cell))
})

const mapStateToProps = state => ({
    minesweeper: state.minesweeper
  })

export default connect(mapStateToProps,mapDispatchToProps)(Cell);