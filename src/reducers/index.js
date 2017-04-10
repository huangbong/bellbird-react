import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import alarms from './alarms';


const appReducer = combineReducers({
  form: formReducer,
  alarms
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};


export default rootReducer;
