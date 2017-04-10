export const REQUEST_ALARMS = 'REQUEST_ALARMS';
export const RECEIVE_ALARMS = 'RECEIVE_ALARMS';
export const REQUEST_CREATE_ALARM = 'REQUEST_CREATE_ALARM';
export const RECEIVE_CREATE_ALARM = 'RECEIVE_CREATE_ALARM';
export const REQUEST_UPVOTE_ALARM = 'REQUEST_UPVOTE_ALARM';
export const RECEIVE_UPVOTE_ALARM = 'RECEIVE_UPVOTE_ALARM';

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

export const fetchAlarms = () => {
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

export const requestCreateAlarm = () => {
  return {
    type: REQUEST_CREATE_ALARM
  }
}

export const receiveCreateAlarm = (alarm) => {
  return {
    type: RECEIVE_CREATE_ALARM,
    alarm
  }
}

export const fetchCreateAlarm = (title) => {
  return dispatch => {
    dispatch(requestCreateAlarm());
    return fetch('/api/v1/alarms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title 
      })
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      dispatch(receiveCreateAlarm(json));
      dispatch(fetchAlarms());
    });
  }
}

export const requestUpvoteAlarm = () => {
  return {
    type: REQUEST_UPVOTE_ALARM
  }
}

export const receiveUpvoteAlarm = (alarm) => {
  return {
    type: RECEIVE_UPVOTE_ALARM,
    alarm
  }
}

export const fetchUpvoteAlarm = (alarmId) => {
  return dispatch => {
    dispatch(requestUpvoteAlarm());
    return fetch('/api/v1/alarms/' + alarmId + '/upvote', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      dispatch(receiveUpvoteAlarm(json));
      dispatch(fetchAlarms());
    });
  }
}