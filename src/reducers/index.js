import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import alarms from './alarms';
import { RECEIVE_CREATE_ALARM } from '../actions/alarms';

const appReducer = combineReducers({
  form: formReducer.plugin({
    createAlarm: (state, action) => {
      switch(action.type) {
        case RECEIVE_CREATE_ALARM:
          return undefined;
        default:
          return state;
      }
    }
  }),
  alarms
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};


export default rootReducer;
