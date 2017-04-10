import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@blueprintjs/core';

class AlarmForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field className='pt-input pt-fill alarm-field' name='title' component='input' type='text' placeholder='Title' />
        <Button className='pt-fill' type='submit'>Add Alarm</Button>
      </form>
    );
  }
}

export default reduxForm({ form: 'alarm' })(AlarmForm);
