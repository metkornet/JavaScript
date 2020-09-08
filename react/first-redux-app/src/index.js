import  {createStore} from 'redux';
import './index.css'

const reducer = (state = 0, action) =>{
  switch(action.type){
    case 'INC':
      return state+1;
    case 'DEC':
      return state-1;
    case 'RES':
      return 0;
    default:
       return state;
  }
}

const inc = ()=>({type: 'INC'});
const dec = ()=>({type: 'DEC'});
const res = ()=>({type: 'RES'});

const store = createStore(reducer);

document.getElementById('inc').addEventListener('click', ()=>{
  store.dispatch(inc());
});

document.getElementById('res').addEventListener('click', ()=>{
  // const value = Math.floor(Math.random()*10);
  store.dispatch(res());
});

document.getElementById('dec').addEventListener('click', ()=>{
  store.dispatch(dec());
});

const update = () =>{
  document.getElementById('counter').textContent = store.getState();
}
store.subscribe(update);


