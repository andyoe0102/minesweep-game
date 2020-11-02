import React from 'react';
import {connect} from 'react-redux';

import Grid from './components/Grid';

import {resetGame,addHeight,checkMine} from './redux/minesweeper/minesweeper.actions';

import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);


  }

  render(){
    return (
      <div className="App">
        <Grid></Grid>
        <button className="resetButton" onClick={this.props.reset}>ResetGame</button>

      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(resetGame()),
  checkMine: (cellId) => dispatch(checkMine(cellId))
})

const mapStateToProps = state => ({
  minesweeper: state.minesweeper
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
