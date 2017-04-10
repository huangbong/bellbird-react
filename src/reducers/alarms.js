import _ from 'lodash';
import { REQUEST_ALARMS, RECEIVE_ALARMS } from '../actions/alarms';

const initialState = {
  alarms: {}
}

function alarms(state = initialState, action) {
  switch(action.type) {
    case REQUEST_ALARMS:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_ALARMS:
      return _.assign({}, state, { data: action.alarms }, { isFetching: false });
    default:
      return state;
  }
}

export default alarms;
