import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from './App';
import * as actions from './redux/minesweeper/minesweeper.actions'

 
const mockStore = configureStore([]);
 
describe('My Connected React-Redux Component', () => {
  let store;
  let component;
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
 
  beforeEach(() => {
    store = mockStore({
      minesweeper: INITIAL_STATE,
    });

    store.dispatch = jest.fn();
 
    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
  it('should dispatch an action on button click', () => {
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });
 
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.resetGame({ type:'RESET_BUTTON' })
    );
  });
});


