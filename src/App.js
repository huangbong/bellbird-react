import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlarms, fetchCreateAlarm, fetchUpvoteAlarm } from './actions/alarms';
import _ from 'lodash';
import { Button } from '@blueprintjs/core';
import AlarmForm from './components/AlarmForm';
// import global styling first
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showAddAlarm: false
    }
  }

  componentWillMount() {
    this.props.fetchAlarms();
  }

  toggleAddAlarm() {
    this.setState({
      showAddAlarm: !this.state.showAddAlarm
    });
  }

  createAlarm(values) {
    this.props.fetchCreateAlarm(values.title);
  }

  upvoteAlarm(alarmId) {
    this.props.fetchUpvoteAlarm(alarmId);
  }

  render() {
    let content = (
      <div className='pt-card bellbird-card'>
        Loading...
      </div>
    );
    if (this.props.alarms.data) {
      content = _.map(this.props.alarms.data, (alarm) => {
        const alarmId = alarm.id;
        return (
          <div key={alarmId} className='pt-card bellbird-card'>
            <span
              className='pt-icon-large pt-icon-symbol-triangle-up icon-inline'
              onClick={() => this.upvoteAlarm(alarmId)}>
            </span>
            {alarm.upvotes}
            <span className='alarm-title'>{ alarm.title.toUpperCase() }</span>
          </div>
        )
      });
    }
    let addAlarm;
    if (this.state.showAddAlarm) {
      addAlarm = (
        <div className='pt-card bellbird-card'>
          <AlarmForm
            onSubmit={(values) => this.createAlarm(values)} />
        </div>
      );
    }
    return (
      <div className='wrapper'>
        <div className='container'>
          <div className='header'>
            Bellbird
            <Button className='add-alarm' onClick={() => this.toggleAddAlarm()}>Add alarm</Button>
          </div>
          { addAlarm }
          { content }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alarms: state.alarms
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlarms: () => {
      dispatch(fetchAlarms());
    },
    fetchCreateAlarm: (alarmId) => {
      dispatch(fetchCreateAlarm(alarmId));
    },
    fetchUpvoteAlarm: (alarmId) => {
      dispatch(fetchUpvoteAlarm(alarmId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
