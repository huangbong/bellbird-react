export const REQUEST_ALARMS = 'REQUEST_ALARMS';
export const RECEIVE_ALARMS = 'RECEIVE_ALARMS';

export const requestAlarms = () => {
  return {
    type: REQUEST_ALARMS
  }
}

export const receiveAlarms = (alarms) => {
  return {
    type: RECEIVE_ALARMS,
    alarms
  }
}

export function fetchAlarms() {
  return dispatch => {
    dispatch(requestAlarms());
    return fetch('/api/v1/alarms', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      dispatch(receiveAlarms(json));
    });
  }
}
