import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlarms } from './actions/alarms';
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

  showAddAlarm() {
    this.setState({
      showAddAlarm: true
    });
  }

  handleSubmit(values) {
    console.log(values);
  }

  render() {
    let content = (
      <div className='pt-card bellbird-card'>
        Loading...
      </div>
    );
    if (this.props.alarms.data) {
      content = _.map(this.props.alarms.data, (alarm) => {
        return (
          <div key={alarm.id} className='pt-card bellbird-card'>
            <span className='pt-icon-large pt-icon-symbol-triangle-up icon-inline'></span>
            {alarm.upvotes}
            <span className='alarm-title'>{alarm.title}</span>
          </div>
        )
      });
    }
    let addAlarm;
    if (this.state.showAddAlarm) {
      addAlarm = (
        <div className='pt-card bellbird-card'>
          <AlarmForm
            onSubmit={(values) => this.handleSubmit(values)} />
        </div>
      );
    }
    return (
      <div className='wrapper'>
        <div className='container'>
          <div className='header'>
            Bellbird
            <Button className='add-alarm' onClick={() => this.showAddAlarm()}>Add alarm</Button>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
